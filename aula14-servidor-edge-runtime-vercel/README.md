# ⚡ Função Edge — Vercel

Projeto desenvolvido para demonstrar a execução de uma **função na borda da rede (Edge Function)** utilizando o ambiente da **Vercel**.

A aplicação retorna informações sobre a execução da função, como horário do servidor, região e tempo de execução.

## 🚀 Tecnologias utilizadas

- **Thunderbolt** — desenvolvimento e execução do projeto.
- **Vercel** — hospedagem e execução da função na infraestrutura Edge.
- **TypeScript** — desenvolvimento da função.
- **Edge Runtime** — ambiente de execução da função na borda da rede.

## 📌 Sobre o projeto

A função é configurada para utilizar o **Edge Runtime** através da propriedade:

```ts
export const config = {
    runtime: 'edge',
};
```

Quando a função é executada, ela registra o momento inicial da execução e retorna uma resposta no formato **JSON** contendo:

- Mensagem informando que a função foi executada na borda;
- Horário atual do servidor;
- Região de execução;
- Tempo de execução da função.

## 💻 Funcionamento

A função recebe uma requisição HTTP e retorna uma resposta com status `200`.

Exemplo de resposta:

```json
{
  "mensagem": "Função executada na borda de rede",
  "horárioDoServidor": "2026-10-06T00:00:00.000Z",
  "regiao": "local-dev",
  "tempoDeExecucao": "0 ms"
}
```

### 🔹 Estrutura da função

```ts
export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    const inicio = new Date();

    return new Response(
        JSON.stringify({
            mensagem: 'Função executada na borda de rede',
            horárioDoServidor: new Date().toISOString(),
            regiao: 'local-dev',
            tempoDeExecucao: `${Date.now() - inicio.getTime()} ms`,
        }),
        {
            status: 200,
            headers: {
                'content-type': 'application/json',
            },
        },
    );
}
```

## ☁️ Deploy

O projeto pode ser hospedado na **Vercel**, que permite executar a função utilizando sua infraestrutura de borda.

Durante o desenvolvimento local, a região apresentada pela função é:

```text
local-dev
```

Esse valor representa o ambiente de desenvolvimento local utilizado no projeto.

## 🎯 Objetivo

O objetivo do projeto é demonstrar, de forma prática, o funcionamento de uma **Edge Function**, observando informações geradas durante sua execução e a utilização de uma infraestrutura de computação distribuída.

## 🛠️ Ferramentas

- [Thunderbolt](https://thunderbolt.dev/)
- [Vercel](https://vercel.com/)
- TypeScript
- Edge Runtime

## 👨‍💻 Autor

**Liam Elliot**