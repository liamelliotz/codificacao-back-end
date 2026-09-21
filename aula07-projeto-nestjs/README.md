Aula 07 — NestJS
📌 Sobre o projeto

Projeto desenvolvido durante a Aula 07, utilizando o framework NestJS.

Nesta etapa, foi realizada a instalação e configuração inicial do Nest CLI e adicionada uma mensagem de status para confirmar que o servidor NestJS está ativo.

🛠️ Tecnologias utilizadas

Node.js

NestJS

Nest CLI

TypeScript

🚀 Instalação do Nest CLI

Para instalar o Nest CLI globalmente, foi utilizado:

npm i -g @nestjs/cli


Após a instalação, é possível verificar se o CLI está disponível com:

nest --version

📂 Estrutura utilizada

A alteração principal foi realizada no arquivo:

src/app.service.ts

💻 AppService

O serviço da aplicação foi configurado utilizando o Injectable do NestJS:

import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Servidor Nest.JS Ativo [Aula07]';
  }
}

🔎 O que foi alterado?

Foi criada/ajustada a classe AppService, que possui o método:

getHello()


Esse método retorna a mensagem:

Servidor Nest.JS Ativo [Aula07]


Essa mensagem pode ser utilizada para verificar se a aplicação NestJS está funcionando corretamente.

▶️ Executando o projeto

Para iniciar o servidor em modo de desenvolvimento:

npm run start:dev


Após iniciar, a aplicação ficará disponível, normalmente, em:

http://localhost:3000


Ao acessar a rota principal, a aplicação deverá apresentar:

Servidor Nest.JS Ativo [Aula07]

✅ Resultado esperado

Ao executar o projeto, o servidor NestJS deve iniciar corretamente e a mensagem de status deverá indicar que o servidor está ativo.

Aula 07 — NestJS
Projeto desenvolvido para fins de aprendizado e prática com o framework NestJS.