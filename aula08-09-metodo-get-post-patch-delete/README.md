# Aula 08-09 — Métodos GET, POST, PATCH e DELETE

Nesta aula foi desenvolvida uma API REST utilizando **NestJS**, trabalhando com os principais métodos HTTP para gerenciamento de convidados:

* **GET** — consulta de dados
* **POST** — criação de convidados
* **PATCH** — atualização parcial de dados
* **DELETE** — remoção de convidados

O objetivo foi compreender como os métodos HTTP são utilizados em conjunto com **Controllers**, **Services**, parâmetros de rota, corpo da requisição e tratamento de erros.

---

## 📚 Conteúdos abordados

* Método `GET`
* Método `POST`
* Método `PATCH`
* Método `DELETE`
* `@Get()`
* `@Post()`
* `@Patch()`
* `@Delete()`
* `@Param()`
* `@Body()`
* `@HttpCode()`
* `NotFoundException`
* Criação de dados
* Consulta de dados
* Atualização de dados
* Remoção de dados
* Validação de IDs
* Tratamento de recursos inexistentes
* Separação de responsabilidades entre Controller e Service

---

## 🚀 Tecnologias utilizadas

* Node.js
* NestJS
* TypeScript
* REST API
* HTTP

---

# 🔎 GET — Consultar convidados

O método `GET` foi utilizado para realizar consultas na API.

Ele permite acessar os convidados cadastrados e também consultar um convidado específico através do seu ID.

### Listar convidados

#### Rota

```http
GET /convidados
```

Essa rota retorna a lista de convidados cadastrados.

### Buscar convidado por ID

#### Rota

```http
GET /convidados/:id
```

#### Exemplo

```http
GET /convidados/2
```

O `@Param('id')` permite capturar o ID informado na URL.

---

# ➕ POST — Criar convidado

O método `POST` foi utilizado para cadastrar um novo convidado.

### Rota

```http
POST /convidados
```

### Corpo da requisição

```json
{
    "nome": "Carlos",
    "idade": 25
}
```

O `@Body()` permite acessar os dados enviados no corpo da requisição.

### Exemplo no Controller

```ts
@Post()
criarConvidado(@Body() dados: CriarConvidadoDto) {
    return this.convidadosService.criarConvidado(dados);
}
```

O Controller recebe os dados e encaminha a operação para o Service, mantendo a separação de responsabilidades.

---

# ✏️ PATCH — Atualizar idade

O método `PATCH` foi utilizado para realizar uma atualização parcial dos dados de um convidado.

Nesta implementação, o método é utilizado especificamente para atualizar a **idade** através do ID.

### Rota

```http
PATCH /convidados/:id
```

### Exemplo

```http
PATCH /convidados/3
```

### Corpo da requisição

```json
{
    "idade": 25
}
```

### Controller

```ts
@Patch(':id')
atualizarIdade(
    @Param('id') id: string,
    @Body('idade') idade: number
) {
    return this.convidadosService.atualizarIdade(+id, idade);
}
```

O `@Param('id')` captura o ID informado na URL.

O `@Body('idade')` captura a nova idade enviada no corpo da requisição.

O operador `+` converte o ID recebido como `string` para `number`.

---

## 🔎 Verificação do convidado

Antes de realizar a atualização, o Service verifica se o convidado existe através do método `encontrarConvidado()`:

```ts
encontrarConvidado(id: number) {
    const convidado = this.convidados.find(
        (buscarConvidado) => buscarConvidado.id === id
    );

    if (!convidado) {
        throw new NotFoundException(
            `[ADMINISTRADOR] Convidado com ID ${id} não encontrado!`
        );
    }

    return convidado;
}
```

Depois da validação, a idade pode ser atualizada:

```ts
atualizarIdade(id: number, idade: number) {
    const convidado = this
```
