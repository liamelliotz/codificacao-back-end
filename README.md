# Codificação Back-End

Repositório destinado ao desenvolvimento das atividades e projetos da disciplina de **Codificação para Back-End**.

## Sobre a Disciplina

A disciplina de **Codificação para Back-End** tem como objetivo apresentar os principais conceitos relacionados ao desenvolvimento de aplicações no lado do servidor. Durante o curso, serão abordados conceitos de programação, organização de projetos, manipulação de dados, comunicação entre sistemas e desenvolvimento de aplicações back-end.

## Atividade Atual — Diagnóstico do Servidor

Nesta atividade foi desenvolvido o arquivo `diagnostico.js`, utilizando **Node.js** e o módulo nativo `os`.

O módulo `os` permite obter informações sobre o sistema operacional e os recursos do computador. O programa realiza um diagnóstico exibindo no terminal:

* Arquitetura do sistema operacional;
* Memória RAM total;
* Memória RAM livre;
* Quantidade de núcleos do processador;
* Modelo do processador;
* Velocidade do processador.

O projeto utiliza o sistema de módulos **CommonJS**, através do comando:

```javascript
const os = require('os');
```

### Código do `diagnostico.js`

```javascript
//! importando CommonJS o módulo os
const os = require('os');

const plataforma = os.platform();
const memoriaTotal = (os.totalmem() / 1024 ** 3).toFixed(2);
const memoriaLivre = (os.freemem() / 1024 ** 3).toFixed(2);
const processador = os.cpus();

console.log('=== DIAGNÓSTICO DO SERVIDOR ===');
console.log(`Arquitetura OS: ${plataforma}`);
console.log(`Memória RAM Total: ${memoriaTotal} GB`);
console.log(`Memória RAM Livre: ${memoriaLivre} GB`);
console.log(`Cores do processador: ${processador.length}`);
console.log(`Processador: ${processador[0].model}`);
console.log(`Velocidade do Processador: ${processador[0].speed} Mhz`);
```

## Configuração do Projeto

O projeto está configurado para utilizar o **CommonJS** como sistema de módulos do Node.js.

Essa configuração está definida no `package.json`:

```json
{
  "name": "aula01-revisao-nodejs.npm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Liam Elliot",
  "license": "ISC",
  "type": "commonjs"
}
```

A propriedade `"type": "commonjs"` permite utilizar a sintaxe `require()` para importar módulos, como o módulo nativo `os`.

## Objetivos

* Compreender os fundamentos do desenvolvimento back-end;
* Desenvolver aplicações utilizando Node.js;
* Aprender a utilizar módulos nativos do Node.js;
* Utilizar o módulo `os` para obter informações do sistema;
* Aprender a estruturar e organizar projetos;
* Trabalhar com comandos no terminal;
* Aplicar boas práticas de programação;
* Utilizar Git e GitHub para versionamento do código.

## Tecnologias

As principais tecnologias utilizadas durante o desenvolvimento das atividades são:

* **JavaScript**
* **Node.js**
* **CommonJS**
* **Módulo `os`**
* **APIs REST**
* **HTTP**
* **Banco de Dados**
* **Git**
* **GitHub**

## Ferramentas

As principais ferramentas utilizadas no desenvolvimento dos projetos são:

* **Visual Studio Code** — editor de código;
* **Node.js** — ambiente de execução para aplicações JavaScript no back-end;
* **Git** — sistema de controle de versão;
* **GitHub** — plataforma para hospedagem e gerenciamento do repositório;
* **Terminal** — utilizado para execução de comandos e gerenciamento do projeto.

## Organização do Projeto

O repositório será utilizado para armazenar as atividades, exercícios e projetos desenvolvidos durante a disciplina.

codificacao-back-end/
│
├── diagnostico.js
├── package.json
└── README.md
```

## Autor

**Liam Elliot**

Projeto desenvolvido para a disciplina de **Codificação para Back-End**.
