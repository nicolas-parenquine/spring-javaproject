# Cadastro de Pilotos de Fórmula 1

Aplicação Spring Boot com frontend integrado para cadastrar e gerenciar pilotos. O frontend está em `src/main/resources/static` e usa a API REST do próprio backend em `/piloto`; por isso, ambos são servidos na mesma origem.

## Pré-requisitos

- Java 25
- PostgreSQL disponível em `localhost:5432`
- Banco `piloto`, usuário `postgres` e senha `postgres` (ou ajuste `src/main/resources/application.properties`)

## Executar

Na raiz do projeto, inicie o backend com:

```powershell
.\mvnw.cmd spring-boot:run
```

Abra [http://localhost:8080](http://localhost:8080). O Spring Boot serve a página e os arquivos estáticos, e a interface acessa a API pela URL relativa `/piloto`.

## Funcionalidades e endpoints

| Ação na interface | Requisição |
| --- | --- |
| Carregar o grid | `GET /piloto` |
| Carregar um piloto para edição | `GET /piloto/{id}` |
| Buscar pelo nome | `GET /piloto/nome/{nome}` |
| Cadastrar piloto | `POST /piloto` com JSON |
| Editar piloto | `PUT /piloto/{id}` com JSON |
| Excluir piloto | `DELETE /piloto/nome/{nome}` |

O JSON do piloto contém `nome`, `nacionalidade`, `equipe` e `ativo` (boolean). O identificador é retornado pela API. Após as operações de escrita, a interface consulta novamente a lista para refletir os dados persistidos. Respostas HTTP com erro são informadas na tela.

## Prompt utilizado

O prompt completo que orientou a criação da interface está em [docs/PROMPT-IA.md](docs/PROMPT-IA.md).

## Demonstração da integração

Para apresentar o fluxo, abra as ferramentas de desenvolvedor do navegador na aba **Network** e:

1. Carregue a página para demonstrar `GET /piloto` e a renderização dos dados retornados.
2. Cadastre um piloto e observe `POST /piloto`, o corpo JSON e a atualização subsequente da lista.
3. Pesquise um nome para demonstrar `GET /piloto/nome/{nome}`.
4. Inicie a edição para demonstrar `GET /piloto/{id}`; salve para demonstrar `PUT /piloto/{id}` e o envio do booleano `ativo`.
5. Exclua um piloto após a confirmação para demonstrar `DELETE /piloto/nome/{nome}`.

O repositório do projeto está em https://github.com/nicolas-parenquine/spring-javaproject.
