const API_URL = "/piloto";

const tableBody = document.querySelector("#pilots-table-body");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const clearSearchButton = document.querySelector("#clear-search-button");
const formPanel = document.querySelector("#form-panel");
const pilotForm = document.querySelector("#pilot-form");
const formTitle = document.querySelector("#form-title");
const saveButton = document.querySelector("#save-button");
const toast = document.querySelector("#toast");

let editingPilotId = null;
let toastTimeout;

function showToast(message, isError = false) {
    window.clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.toggle("error", isError);
    toast.hidden = false;
    toastTimeout = window.setTimeout(() => {
        toast.hidden = true;
    }, 4200);
}

async function request(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            Accept: "application/json",
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers
        }
    });

    if (!response.ok) {
        const detail = await response.text();
        throw new Error(detail || `A API respondeu com erro HTTP ${response.status}.`);
    }

    if (response.status === 204) {
        return null;
    }

    const body = await response.text();
    return body ? JSON.parse(body) : null;
}

function renderPilots(pilots) {
    setApiStatus(true);
    document.querySelector("#total-count").textContent = pilots.length;
    document.querySelector("#active-count").textContent = pilots.filter(pilot => pilot.ativo).length;
    document.querySelector("#results-count").textContent = `${pilots.length} ${pilots.length === 1 ? "PILOTO" : "PILOTOS"}`;

    if (pilots.length === 0) {
        tableBody.innerHTML = '<tr><td class="table-message" colspan="5">Nenhum piloto encontrado. Cadastre um novo piloto ou tente outra busca.</td></tr>';
        return;
    }

    tableBody.replaceChildren(...pilots.map(pilot => {
        const row = document.createElement("tr");
        const name = document.createElement("td");
        name.append(document.createTextNode(pilot.nome));
        const id = document.createElement("span");
        id.className = "pilot-id";
        id.textContent = `ID ${pilot.id}`;
        name.append(id);

        const nationality = document.createElement("td");
        nationality.textContent = pilot.nacionalidade;
        const team = document.createElement("td");
        team.textContent = pilot.equipe;

        const statusCell = document.createElement("td");
        const status = document.createElement("span");
        status.className = `status-badge${pilot.ativo ? "" : " inactive"}`;
        status.textContent = pilot.ativo ? "ATIVO" : "INATIVO";
        statusCell.append(status);

        const actions = document.createElement("td");
        actions.className = "actions-cell";
        const editButton = document.createElement("button");
        editButton.className = "row-action";
        editButton.type = "button";
        editButton.textContent = "Editar";
        editButton.setAttribute("aria-label", `Editar ${pilot.nome}`);
        editButton.addEventListener("click", () => fetchPilotForEdit(pilot.id));

        const deleteButton = document.createElement("button");
        deleteButton.className = "row-action delete";
        deleteButton.type = "button";
        deleteButton.textContent = "Excluir";
        deleteButton.setAttribute("aria-label", `Excluir ${pilot.nome}`);
        deleteButton.addEventListener("click", () => deletePilot(pilot));
        actions.append(editButton, deleteButton);
        row.append(name, nationality, team, statusCell, actions);
        return row;
    }));
}

function setApiStatus(connected) {
    const dot = document.querySelector("#api-status-dot");
    const label = document.querySelector("#api-status-label");
    dot.classList.toggle("offline", !connected);
    label.textContent = connected ? "API CONECTADA" : "API INDISPONÍVEL";
}

function renderTableMessage(message, isError = false) {
    if (isError) {
        setApiStatus(false);
    }
    document.querySelector("#total-count").textContent = "—";
    document.querySelector("#active-count").textContent = "—";
    document.querySelector("#results-count").textContent = "—";
    tableBody.innerHTML = "";
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.className = `table-message${isError ? " error" : ""}`;
    cell.textContent = message;
    row.append(cell);
    tableBody.append(row);
}

async function loadPilots(name = "") {
    clearSearchButton.hidden = !name;
    renderTableMessage("Carregando pilotos...");
    try {
        const path = name ? `/nome/${encodeURIComponent(name)}` : "";
        const result = await request(path);
        renderPilots(name ? (result ? [result] : []) : (result || []));
    } catch (error) {
        renderTableMessage("Não foi possível carregar os pilotos. Verifique se a aplicação e o banco de dados estão disponíveis.", true);
        showToast(error.message, true);
    }
}

function openNewForm() {
    editingPilotId = null;
    pilotForm.reset();
    document.querySelector("#pilot-active").value = "true";
    formTitle.textContent = "Novo piloto";
    saveButton.innerHTML = 'Salvar piloto <span aria-hidden="true">↗</span>';
    formPanel.hidden = false;
    document.querySelector("#pilot-name").focus();
    formPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openEditForm(pilot) {
    editingPilotId = pilot.id;
    pilotForm.elements.nome.value = pilot.nome;
    pilotForm.elements.nacionalidade.value = pilot.nacionalidade;
    pilotForm.elements.equipe.value = pilot.equipe;
    pilotForm.elements.ativo.value = String(pilot.ativo);
    formTitle.textContent = `Editar piloto · #${pilot.id}`;
    saveButton.innerHTML = 'Salvar alterações <span aria-hidden="true">↗</span>';
    formPanel.hidden = false;
    document.querySelector("#pilot-name").focus();
    formPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function fetchPilotForEdit(id) {
    try {
        const pilot = await request(`/${id}`);
        openEditForm(pilot);
    } catch (error) {
        showToast(`Não foi possível carregar o piloto: ${error.message}`, true);
    }
}

function closeForm() {
    formPanel.hidden = true;
    pilotForm.reset();
    editingPilotId = null;
}

async function deletePilot(pilot) {
    if (!window.confirm(`Excluir ${pilot.nome} do cadastro?`)) {
        return;
    }

    try {
        await request(`/nome/${encodeURIComponent(pilot.nome)}`, { method: "DELETE" });
        showToast(`${pilot.nome} foi excluído.`);
        searchInput.value = "";
        await loadPilots();
    } catch (error) {
        showToast(`Não foi possível excluir o piloto: ${error.message}`, true);
    }
}

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    loadPilots(searchInput.value.trim());
});

clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    loadPilots();
    searchInput.focus();
});

document.querySelector("#new-pilot-button").addEventListener("click", openNewForm);
document.querySelector("#close-form-button").addEventListener("click", closeForm);
document.querySelector("#cancel-form-button").addEventListener("click", closeForm);

pilotForm.addEventListener("submit", async event => {
    event.preventDefault();
    const pilot = {
        nome: pilotForm.elements.nome.value.trim(),
        nacionalidade: pilotForm.elements.nacionalidade.value.trim(),
        equipe: pilotForm.elements.equipe.value.trim(),
        ativo: pilotForm.elements.ativo.value === "true"
    };

    saveButton.disabled = true;
    try {
        await request(editingPilotId === null ? "" : `/${editingPilotId}`, {
            method: editingPilotId === null ? "POST" : "PUT",
            body: JSON.stringify(pilot)
        });
        showToast(editingPilotId === null ? "Piloto cadastrado com sucesso." : "Cadastro atualizado com sucesso.");
        closeForm();
        searchInput.value = "";
        await loadPilots();
    } catch (error) {
        showToast(`Não foi possível salvar o piloto: ${error.message}`, true);
    } finally {
        saveButton.disabled = false;
    }
});

loadPilots();
