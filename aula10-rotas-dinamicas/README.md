# Aula 10 — Rotas Dinâmicas no NestJS

Nesta aula foi trabalhado o uso de **rotas dinâmicas** no NestJS, utilizando `@Param()` e `ParseIntPipe` para buscar um jogo específico pelo seu ID.

## 📚 Conteúdos

* Rotas dinâmicas com `:id`
* `@Param()`
* `ParseIntPipe`
* `NotFoundException`
* Separação entre Controller e Service

## 📁 Estrutura

src/
├── app.controller.ts
├── app.service.ts
├── app.module.ts
├── jogos.controller.ts
├── jogos.service.ts
└── main.ts
```

## 🎮 Rota criada

GET /jogos/:id
```

Exemplo:

GET /jogos/2
```

Retorna o jogo com o ID informado.

### Erros

* ID inexistente → `404 Not Found`
* ID não numérico → `400 Bad Request`

## ▶️ Como executar

Instale as dependências:

```bash
npm install
```

Inicie o projeto:

```bash
npm run start
```

O servidor será executado em:

http://localhost:3000
```

## 🧪 Exemplos

/jogos/1
/jogos/2
/jogos/3
```

Para testar um ID inexistente:

/jogos/99
```

Para testar um ID inválido:

/jogos/abc
```

## 🎯 Objetivo da aula

Aprender a utilizar **parâmetros de rota** no NestJS para localizar recursos específicos através do ID.
