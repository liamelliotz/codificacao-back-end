🚀 NestJS API

API REST desenvolvida com NestJS + TypeScript, contendo um endpoint público de status e uma rota protegida por API Key.

🛠️ Tecnologias

NestJS

TypeScript

Node.js

Express

📂 Estrutura
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── seguranca.controller.ts

Arquivo	Função
app.module.ts	Módulo principal
app.controller.ts	Endpoint /status
app.service.ts	Lógica do status
seguranca.controller.ts	Endpoint protegido
📡 Endpoints
GET /status

Endpoint público para verificar o funcionamento da API.

curl http://localhost:3000/status


A resposta é fornecida pelo AppService.

GET /secret

Endpoint protegido por API Key através do header:

y-api-key: <SUA_API_KEY>


Exemplo:

curl http://localhost:3000/secret \
  -H "y-api-key: <SUA_API_KEY>"

Respostas

API Key válida:

200 OK

{
  "message": "Acesso concedido a Area Secreta!",
  "log": "..."
}


API Key inválida ou ausente:

403 Forbidden

{
  "erro": "Forbidden",
  "mensagem": "Chave API inválida ou ausente",
  "log": "..."
}


🔒 A API Key não é exibida neste README.

⚙️ Instalação
npm install

▶️ Executar
Desenvolvimento
npm run start:dev

Produção
npm run build
npm run start:prod


A API estará disponível em:

http://localhost:3000

🔐 Segurança

Para ambientes reais, recomenda-se:

Utilizar variáveis de ambiente para API Keys.

Nunca publicar secrets no código ou Git.

Utilizar HTTPS.

Considerar Guards do NestJS para autenticação.

<div align="center">

🚀 NestJS + TypeScript

</div>