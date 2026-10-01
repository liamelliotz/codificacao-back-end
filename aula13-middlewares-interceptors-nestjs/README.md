# 📚 Aula 13 — Middlewares e Interceptors no NestJS

## 📌 Sobre a aula

Nesta aula foi estudado o conceito de **Middlewares** no NestJS e como eles podem ser utilizados para executar uma lógica antes que uma requisição chegue ao Controller.

O projeto implementa um Middleware responsável por:

* Registrar informações das requisições;
* Identificar a rota acessada;
* Verificar o acesso às rotas administrativas;
* Bloquear usuários que não possuem o privilégio necessário;
* Permitir a continuação da requisição através do `next()`.

---

## 🧠 O que é um Middleware?

Um **Middleware** é uma função executada durante o processamento de uma requisição HTTP.

Ele pode:

* Analisar a requisição;
* Alterar informações da requisição;
* Verificar autenticação ou autorização;
* Registrar logs;
* Bloquear requisições;
* Permitir que a requisição continue para o próximo estágio.

No NestJS, um Middleware pode implementar a interface:

```ts
NestMiddleware
```

E precisa possuir o método:

```ts
use(req, res, next)
```

---

## 🛠️ Middleware utilizado

O projeto possui um Middleware chamado:

```text
LoggerMiddleware
```

Ele é responsável por registrar as requisições e controlar o acesso à rota `/admin`.

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentUrl = req.originalUrl || req.url;

    console.log(`[LOG] Método: ${req.method} | Rota: ${req.path}`);

    if (currentUrl.startsWith('/admin')) {
      const base = req.headers['x-user-base'];

      if (base !== 'Administrador') {
        return res.status(403).json({
          Codigo: 403,
          messagem: 'Acesso Negado: Previlégio de Aministrator necessário',
          registro: new Date,
        });
      }
    }

    next();
  }
}
```

---

## 🔎 Funcionamento do Middleware

### 1. Identificação da URL

```ts
const currentUrl = req.originalUrl || req.url;
```

Obtém a URL original da requisição.

O `originalUrl` é utilizado quando disponível. Caso contrário, o código utiliza `req.url`.

---

### 2. Registro da requisição

```ts
console.log(`[LOG] Método: ${req.method} | Rota: ${req.path}`);
```

Exibe no terminal informações sobre a requisição.

Exemplo:

```text
[LOG] Método: GET | Rota: /
```

Ou:

```text
[LOG] Método: GET | Rota: /admin
```

Isso permite acompanhar quais rotas estão sendo acessadas.

---

## 🔐 Controle de acesso

O Middleware verifica se a URL começa com:

```ts
/admin
```

através de:

```ts
if (currentUrl.startsWith('/admin'))
```

Quando a rota é administrativa, o Middleware verifica o Header:

```text
x-user-base
```

O valor é obtido através de:

```ts
const base = req.headers['x-user-base'];
```

---

## 👤 Verificação do administrador

O acesso é perm
