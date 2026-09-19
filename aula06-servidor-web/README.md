# Aula 06 — Servidor HTTP com Node.js

Nesta aula, aprendemos a criar um servidor web utilizando o módulo nativo `http` do Node.js.

O servidor será capaz de:

- Receber requisições HTTP.
- Identificar o método e a rota acessada.
- Criar uma rota de status.
- Retornar respostas em JSON.
- Utilizar códigos de status HTTP.
- Adicionar cabeçalhos básicos de segurança.
- Escutar requisições na porta `3000`.

##  Conteúdos

- Módulo `http` do Node.js
- `http.createServer()`
- Requisição (`req`)
- Resposta (`res`)
- Métodos HTTP
- Rotas
- Status HTTP
- Cabeçalhos HTTP
- JSON
- `res.writeHead()`
- `res.end()`
- `servidor.listen()`

##  Código da Aula

```javascript
import http from 'http';

const servidorWeb = http.createServer((req, res) => {
    console.log(`[LOG] Método Recebido: ${req.method} | Rota: ${req.url}`);

    const cabecalhoPadrao = {
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
    };

    if (req.url === '/status') {
        res.writeHead(200, {
            ...cabecalhoPadrao,
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({ servidorWeb: 'Online' }));
    } else {
        res.writeHead(404, {
            ...cabecalhoPadrao,
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({ erro: 'Página não encontrada!' }));
    }
});

servidorWeb.listen(3000, () => {
    console.log('Servidor Web ativo');
    console.log('Porta: 3000');
});
