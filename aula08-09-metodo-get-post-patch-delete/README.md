Aula 08-09 — Métodos GET, POST, PATCH e DELETE

Nesta aula foi desenvolvida uma API REST utilizando NestJS, trabalhando com os métodos HTTP GET, POST, PATCH e DELETE para gerenciamento de convidados.

🚀 Tecnologias

Node.js

NestJS

TypeScript

REST API

HTTP

📚 Conceitos utilizados

@Get()

@Post()

@Patch()

@Delete()

@Param()

@Body()

@HttpCode()

NotFoundException

Controllers e Services

Manipulação de arrays

🔎 GET — Listar convidados
GET /convidados


Retorna a lista de convidados cadastrados.

@Get()
listarConvidados() {
    return this.convidadosService.listarConvidados();
}

➕ POST — Criar convidado
POST /convidados


Exemplo de corpo:

{
    "nome": "Carlos",
    "idade": 25
}


O @Body() recebe os dados enviados na requisição.

Atualmente, o POST apenas recebe e retorna os dados. Ele não adiciona o convidado ao array.

✏️ PATCH — Atualizar idade
PATCH /convidados/:id


Exemplo:

PATCH /convidados/3


Corpo:

{
    "idade": 25
}


O @Param('id') recebe o ID e o @Body('idade') recebe a nova idade.

@Patch(':id')
atualizarIdade(@Param('id') id: string, @Body('idade') idade: number) {
    return this.convidadosService.atualizarIdade(+id, idade);
}


Caso o convidado não exista, é utilizado NotFoundException, retornando erro 404.

🗑️ DELETE — Remover convidado
DELETE /convidados/:id


Exemplo:

DELETE /convidados/3


O convidado é localizado pelo ID e removido utilizando splice().

@Delete(':id')
@HttpCode(204)
removerConvidado(@Param('id') id: string) {
    this.convidadosService.removerConvidadoLista(+id);
}


O @HttpCode(204) define a resposta como 204 — No Content.

📌 Rotas
Método	Rota	Função
GET	/convidados	Lista convidados
POST	/convidados	Recebe dados do convidado
PATCH	/convidados/:id	Atualiza a idade
DELETE	/convidados/:id	Remove convidado
🎯 Objetivo

Praticar a criação de uma API REST com NestJS, utilizando Controllers, Services, parâmetros, corpo da requisição e tratamento de erros.