# Prompt utilizado para gerar o frontend

```text
Crie um frontend funcional, responsivo e em português do Brasil para o projeto Java Spring Boot "Cadastro de Pilotos de Fórmula 1". Antes de implementar, considere os arquivos do backend e respeite os endpoints e o modelo de dados existentes. O frontend deve ser simples de executar, sem dependências de build ou bibliotecas externas obrigatórias, e deve ser servido pelo próprio Spring Boot em src/main/resources/static para que a interface e a API compartilhem a mesma origem.

Contexto da API:
- Base: /piloto
- GET /piloto: retorna uma lista JSON de pilotos.
- GET /piloto/{id}: retorna um piloto pelo ID.
- GET /piloto/nome/{nome}: retorna um piloto pelo nome.
- POST /piloto: recebe no corpo JSON { "nome": string, "nacionalidade": string, "equipe": string, "ativo": boolean } e cadastra um piloto.
- PUT /piloto/{id}: recebe no corpo JSON com os campos nome, nacionalidade, equipe e ativo e atualiza o piloto.
- DELETE /piloto/nome/{nome}: exclui o piloto pelo nome.
- As operações POST, PUT e DELETE respondem com HTTP 200 sem corpo. Trate qualquer resposta HTTP não bem-sucedida como erro visível para o usuário.

Modelo JSON: { "id": number, "nome": string, "nacionalidade": string, "equipe": string, "ativo": boolean }. Não envie o id em uma criação.

Implemente uma página de gerenciamento de pilotos com:
1. Cabeçalho e título de uma aplicação temática de Fórmula 1, com apresentação visual organizada e profissional.
2. Indicadores com total de pilotos e quantidade de pilotos ativos.
3. Tabela responsiva com nome, ID, nacionalidade, equipe, estado ativo/inativo e ações.
4. Busca pelo nome utilizando GET /piloto/nome/{nome}; ao limpar a busca, carregar GET /piloto.
5. Formulário de criação e edição. Criação usa POST /piloto; ao iniciar uma edição, busque os dados atuais com GET /piloto/{id} e salve usando PUT /piloto/{id}. O campo ativo deve ser booleano (true/false) no JSON.
6. Exclusão com confirmação e DELETE /piloto/nome/{nome}. Codifique nomes com encodeURIComponent para suportar espaços e caracteres especiais em caminhos.
7. Após criar, editar ou excluir, atualize a tabela chamando a API novamente. Exiba mensagens claras para carregamento, resultados vazios e erros de comunicação.
8. Use fetch com os verbos HTTP corretos, Content-Type application/json nas requisições com corpo e confira response.ok. Não simule dados e não esconda erros.
9. Construa as células da tabela de forma segura, sem interpolar dados da API em innerHTML. Inclua rótulos acessíveis, estados de foco e suporte a telas pequenas.

Entregue HTML, CSS e JavaScript puros dentro de src/main/resources/static. Documente como iniciar o Spring Boot e como cada ação da interface corresponde ao endpoint da API. Não altere nem invente endpoints no backend.
```

O prompt descreve os endpoints encontrados no controller Java do projeto. A interface foi construída com HTML, CSS e JavaScript puros, servidos pelo Spring Boot.
