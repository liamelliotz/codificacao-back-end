# Aula 08-09 — Métodos PATCH e DELETE

Nesta aula foram adicionados os métodos HTTP **PATCH** e **DELETE** à API desenvolvida anteriormente com NestJS.

O objetivo foi trabalhar a **atualização e remoção de convidados**, além do tratamento de erros quando o ID informado não existe.

## 📚 Conteúdos abordados

* Método `PATCH`
* Método `DELETE`
* `@Patch()`
* `@Delete()`
* `@Param()`
* `@Body()`
* `@HttpCode()`
* `NotFoundException`
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

# ✏️ PATCH — Atualizar idade

O método `PATCH` foi adicionado para permitir a atualização parcial dos dados de um convidado.

Nesta aula, o método foi utilizado especificamente para atualizar a **idade** de um convidado através do seu ID.

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
    const convidado = this.encontrarConvidado(id);

    console.log(`[ADMINISTRADOR] Atualizando idade do ID ${id}`);

    convidado.idade = idade;

    return convidado;
}
```

---

# 🗑️ DELETE — Remover convidado

O método `DELETE` foi adicionado para permitir a remoção de um convidado através do seu ID.

### Rota

```http
DELETE /convidados/:id
```

### Exemplo

```http
DELETE /convidados/3
```

### Controller

```ts
@Delete(':id')
@HttpCode(204)
removerConvidado(@Param('id') id: string) {
    this.convidadosService.removerConvidadoLista(+id);
}
```

O `@Param('id')` captura o ID informado na URL.

O `@HttpCode(204)` define o status HTTP **204 No Content** para uma remoção realizada com sucesso.

---

## 🔎 Verificação antes da remoção

O Service procura o índice do convidado na lista:

```ts
const index = this.convidados.findIndex(
    (convidado) => convidado.id === id
);
```

Caso o ID não exista, é lançada uma exceção:

```ts
if (index === -1) {
    throw new NotFoundException(
        `[ADMINISTRADOR] Convidado com ID ${id} não encontrado!`
    );
}
```

Caso o convidado exista, ele é removido da lista:

```ts
return this.convidados.splice(index, 1);
```

---

# ⚠️ Tratamento de erros

Foi utilizado o `NotFoundException` do NestJS para tratar requisições que tentam acessar um convidado inexistente.

```ts
import { Injectable, NotFoundException } from "@nestjs/common";
```

Por exemplo, ao tentar atualizar:

```http
PATCH /convidados/9
```

quando o ID `9` não existe, a API retorna:

```json
{
    "message": "[ADMINISTRADOR] Convidado com ID 9 não encontrado!",
    "error": "Not Found",
    "statusCode": 404
}
```

O mesmo tratamento é utilizado no método `DELETE`.

---

# 📝 Logs

Os logs das operações de atualização e remoção foram colocados no **Service depois da validação**.

### PATCH

```ts
const convidado = this.encontrarConvidado(id);

console.log(`[ADMINISTRADOR] Atualizando idade do ID ${id}`);
```

Dessa forma, se o ID não existir, o log de atualização não será exibido.

### DELETE

```ts
if (index === -1) {
    throw new NotFoundException(
        `[ADMINISTRADOR] Convidado com ID ${id} não encontrado!`
    );
}

console.log(
    `[ADMINISTRADOR] Convidado com ID ${id} removido com sucesso!`
);
```

Assim, a mensagem de sucesso somente aparece quando o convidado realmente é encontrado e removido.

---

# 📂 Estrutura relacionada à aula

```text
aula08-09-metodo-get-post-patch-delete/
│
├── src/
│   └── convidados/
│       ├── convidados.controller.ts
│       ├── convidados.service.ts
│       └── criar-convidado.dto.ts
│
├── .gitignore
├── .oxlintrc.json
├── .prettierrc
├── README.md
├── package.json
├── tsconfig.json
└── ...
```

---

# 🔗 Endpoints adicionados nesta aula

| Método   | Rota                          | Função                           | Status |
| -------- | ----------------------------- | -------------------------------- | ------ |
| `PATCH`  | `/convidados/:id`             | Atualiza a idade do convidado    | `200`  |
| `DELETE` | `/convidados/:id`             | Remove um convidado              | `204`  |
| `PATCH`  | `/convidados/:id` inexistente | Retorna convidado não encontrado | `404`  |
| `DELETE` | `/convidados/:id` inexistente | Retorna convidado não encontrado | `404`  |

---

# 🎯 Objetivo da aula

O objetivo desta aula foi adicionar os métodos **PATCH** e **DELETE** à API desenvolvida na aula anterior.

Também foram trabalhados o uso de parâmetros de rota, atualização e remoção de dados, além do tratamento de erros utilizando `NotFoundException`.

Com isso, a API passou a possuir as operações de **atualização e exclusão**, complementando os métodos desenvolvidos anteriormente.
