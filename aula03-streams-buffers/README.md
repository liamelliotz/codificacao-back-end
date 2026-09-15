# Aula 03 — Streams e Buffers

Projeto desenvolvido durante a aula sobre **Streams e Buffers no Node.js**, com o objetivo de compreender o processamento e a escrita de grandes volumes de dados utilizando streams.

## Estrutura do projeto

* `gerarLogGigante.js` — responsável por gerar um arquivo de log simulado.
* `servidor.log` — arquivo gerado contendo 400.000 linhas de registros.
* `package.json` — configurações do projeto Node.js.

## gerarLogGigante.js

O arquivo utiliza o módulo `fs` do Node.js para criar uma **Write Stream** através de `fs.createWriteStream()`.

O programa gera **400.000 linhas** no arquivo `servidor.log`, contendo:

* Data e hora da geração;
* Número da linha;
* Status HTTP `200`;
* Mensagem de teste;
* Classificação do registro como `INFO` ou `ERROR`.

A cada 7 linhas, o registro é definido como `ERROR`. As demais são classificadas como `INFO`.

```javascript
import fs from 'fs';

const data = new Date().toISOString().split('T')[0];
const hora = new Date().toLocaleTimeString();

const streamEscrita = fs.createWriteStream('servidor.log');
console.log('Gerando arquivo de log simulado...');

for (let i = 0; i < 400000; i++) {
    const tipo = i % 7 === 0 ? 'ERROR' : 'INFO';
    streamEscrita.write(`[${data} - ${hora}] Linha ${i}: Status 200 - Mensagem de teste ${tipo} \n`);
}

streamEscrita.end();
```

## servidor.log

Após a execução do programa, foi gerado o arquivo `servidor.log` contendo **400.000 linhas**, com registros dos tipos `INFO` e `ERROR`.

O arquivo foi utilizado para demonstrar a escrita de uma grande quantidade de dados por meio de uma stream.

## package.json

O projeto foi configurado para utilizar **ES Modules**, através da propriedade:

```json
"type": "module"
```

Configuração atual:

```json
{
  "name": "aula03-streams-buffers",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}
```

## Objetivo da aula

Compreender o funcionamento de **Streams e Buffers no Node.js**, especialmente a utilização de streams para trabalhar com grandes volumes de dados sem precisar carregar todo o conteúdo de uma vez na memória.
