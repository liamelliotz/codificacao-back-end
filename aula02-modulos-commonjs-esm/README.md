# Aula 02 — Módulos ESM e Logs

Projeto desenvolvido na **Aula 02 de Node.js**, com foco em **módulos ESM**, manipulação de arquivos e criação de um sistema simples de logs.

## Conteúdos

- Módulos ESM (`import` e `export`)
- `fs/promises`
- `path`
- `fileURLToPath`
- `import.meta.url`
- Criação de diretórios e arquivos
- Registro e formatação de logs
- Configuração do `package.json`

## Estrutura

```text
aula02-modulos-commonjs-esm/
├── index.js
├── utilitario.js
├── package.json
└── Logs/
    └── syslog.log
```

## Funcionamento

O projeto cria automaticamente a pasta `Logs` e o arquivo `syslog.log`.

As mensagens são formatadas com **data e horário** através da função `formatLog()` e adicionadas ao arquivo utilizando `fs.appendFile()`.

Exemplo:

```text
[2026-09-14 - 20:30:15]: Inicialização do servidor concluída!
[2026-09-14 - 20:30:15]: Conexão com banco de dados estabelecida!
```

## Configuração

O projeto utiliza ESM através da configuração:

```json
"type": "module"
```

##  Execução

```bash
node index.js
```

## Objetivo

Praticar a utilização de **módulos ESM no Node.js** e a manipulação de arquivos para desenvolver um sistema básico de registro de logs.
