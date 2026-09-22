package br.com.formula1.cadastro_piloto.business;

import br.com.formula1.cadastro_piloto.infrastructure.entitys.PilotoF1;
import br.com.formula1.cadastro_piloto.infrastructure.repository.PilotoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PilotoService {

    private final PilotoRepository repository;

    public PilotoService(PilotoRepository repository) {
        this.repository = repository;
    }

    public PilotoF1 salvar(PilotoF1 piloto) {
        return repository.saveAndFlush(piloto);
    }

    public List<PilotoF1> listarTodos() {
        return repository.findAll();
    }

    public PilotoF1 buscarPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Piloto não encontrado"));
    }

    public PilotoF1 buscarPilotoPorNome(String nome) {
        return repository.findByNome(nome)
                .orElseThrow(() ->
                        new RuntimeException("Piloto não encontrado"));
    }

    public PilotoF1 atualizar(Integer id, PilotoF1 piloto) {

        PilotoF1 pilotoExistente = buscarPorId(id);

        pilotoExistente.setNome(piloto.getNome());
        pilotoExistente.setNacionalidade(piloto.getNacionalidade());
        pilotoExistente.setEquipe(piloto.getEquipe());
        pilotoExistente.setAtivo(piloto.isAtivo());

        return repository.saveAndFlush(pilotoExistente);
    }

    public void deletar(Integer id) {

        PilotoF1 piloto = buscarPorId(id);

        repository.delete(piloto);
        repository.flush();
    }
}