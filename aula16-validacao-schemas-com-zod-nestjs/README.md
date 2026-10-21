Aula 16 — Validação de Schemas com Zod no NestJS
📌 Descrição
Esta aula tem como objetivo implementar a validação de dados em uma aplicação back-end desenvolvida com NestJS, utilizando a biblioteca Zod para definir schemas e verificar as informações recebidas nas requisições HTTP.

Foi desenvolvido um endpoint para cadastro de colaboradores, com regras de validação para nome, e-mail, idade e departamento. Para integrar o Zod ao NestJS, foi criado um pipe personalizado chamado ZodValidationPipe, responsável por validar os dados e retornar mensagens de erro quando as informações enviadas forem inválidas.

🛠️ Tecnologias utilizadas
Node.js — Ambiente de execução JavaScript.
NestJS — Framework para desenvolvimento de aplicações back-end.
TypeScript — Linguagem utilizada no desenvolvimento.
Zod — Biblioteca para validação de dados e definição de schemas.
Jest — Framework utilizado para testes automatizados.
npm — Gerenciador de pacotes do projeto.
📂 Estrutura do projeto
Os principais arquivos utilizados nesta atividade são:


aula16-validacao-schemas-com-zod-nestjs/
├── src/
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
│   ├── colaborador.schema.ts
│   ├── colaboradores.controller.ts
│   └── zod-validation.pipe.ts
├── package.json
└── README.md
Observação: a estrutura pode variar conforme a organização do projeto. Os arquivos .js utilizados nos imports do código correspondem à configuração de módulos TypeScript/ESM.

📦 Instalação
Primeiro, acesse a pasta do projeto pelo terminal:


cd aula16-validacao-schemas-com-zod-nestjs
Instale as dependências:


npm install
Instale o Zod, caso ainda não esteja presente no projeto:


npm install zod
1. Schema de validação dos colaboradores
No arquivo colaborador.schema.ts, foi definido o schema colaboradorSchema, responsável por estabelecer as regras de validação dos dados.

Os campos validados são:

Nome: deve conter no mínimo três caracteres.
E-mail: deve apresentar um formato válido.
Idade: deve ser um número entre 18 e 65 anos.
Departamento: deve corresponder a uma das opções permitidas: TI, RH, Comercial ou Financeiro.
O código também utiliza z.infer<typeof colaboradorSchema> para gerar automaticamente o tipo TypeScript Colaborador a partir do schema definido.

2. Pipe personalizado de validação
No arquivo zod-validation.pipe.ts, foi implementada a classe ZodValidationPipe, que integra a validação do Zod ao sistema de pipes do NestJS.

O método transform() verifica se os dados pertencem ao corpo da requisição e utiliza safeParse() para validar as informações.

Quando os dados são válidos, o pipe retorna os dados validados. Quando há erros, lança uma BadRequestException com o status HTTP 400, informando os campos inválidos e suas respectivas mensagens.

3. Controller de colaboradores
No arquivo colaboradores.controller.ts, foi criado o controlador responsável pelo cadastro de colaboradores.

A rota utiliza o método HTTP POST e o caminho /colaboradores. O decorador @UsePipes() aplica o ZodValidationPipe utilizando o schema colaboradorSchema.

Quando os dados são válidos, o endpoint retorna uma mensagem de confirmação e os dados recebidos.

4. AppController e AppService
O AppController define a rota principal da aplicação por meio do decorador @Get() e utiliza o AppService por injeção de dependência.

O AppService implementa o método getHello(), responsável por retornar a mensagem Hello World!.

Esses arquivos fazem parte da estrutura inicial do NestJS e ajudam a demonstrar a organização entre controladores e serviços.

5. Configuração do módulo principal
O arquivo app.module.ts registra os controladores e os provedores utilizados pela aplicação.

O AppController e o ColaboradoresController são registrados em controllers, enquanto o AppService é registrado em providers.

O ZodValidationPipe, por ser um pipe personalizado, pode ser registrado em providers caso seja necessário disponibilizá-lo por injeção de dependência. No exemplo utilizado, ele é instanciado diretamente no controlador.

6. Inicialização da aplicação
No arquivo main.ts, a função NestFactory.create(AppModule) cria a aplicação NestJS.

Em seguida, app.listen() inicia o servidor na porta definida pela variável de ambiente PORT, utilizando a porta 3000 como padrão quando nenhuma variável estiver configurada.

▶️ Como executar a aplicação
Após instalar as dependências, execute:


npm run start:dev
Por padrão, a aplicação estará disponível em:


http://localhost:3000
🧪 Testando o cadastro de colaboradores
Utilize o Postman, Insomnia ou outra ferramenta de requisições HTTP.

Endpoint:


POST http://localhost:3000/colaboradores
Configure o cabeçalho:


Content-Type: application/json
Exemplo de requisição válida

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "idade": 25,
  "departamento": "TI"
}
Resultado esperado
Se todos os campos atenderem às regras de validação, a aplicação retornará uma resposta semelhante a:


{
  "mensagem": "Colaborador cadastro com sucesso",
  "dados": {
    "nome": "João Silva",
    "email": "joao@email.com",
    "idade": 25,
    "departamento": "TI"
  }
}
Exemplo de requisição inválida

{
  "nome": "Jo",
  "email": "email-invalido",
  "idade": 16,
  "departamento": "Marketing"
}
Nesse caso, o ZodValidationPipe identificará os campos que não atendem às regras do schema e retornará um erro HTTP 400 Bad Request, acompanhado das mensagens de validação correspondentes.

🧪 Executando os testes automatizados
O projeto também possui um teste unitário para o AppController, verificando se o método getHello() retorna a mensagem esperada.

Para executar os testes, utilize:


npm run test
O teste verifica se o resultado de appController.getHello() é igual a Hello World!.

🎯 Objetivos alcançados
Compreender a definição de schemas com Zod.
Criar regras de validação para dados de colaboradores.
Utilizar inferência de tipos com TypeScript.
Implementar um pipe personalizado no NestJS.
Tratar erros de validação com respostas HTTP apropriadas.
Criar um endpoint POST para cadastro de colaboradores.
Organizar controladores, serviços e provedores no módulo principal.
Executar testes automatizados com Jest.
✅ Conclusão
A Aula 16 permitiu compreender como implementar a validação de dados em uma aplicação NestJS utilizando a biblioteca Zod. Por meio da definição de schemas e da criação de um pipe personalizado, foi possível verificar as informações recebidas antes de processá-las e fornecer mensagens claras quando os dados não atendem aos requisitos estabelecidos.

A atividade também reforçou conceitos importantes do desenvolvimento back-end, como rotas HTTP, injeção de dependência, organização de módulos, tratamento de erros e testes automatizados. Esses recursos contribuem para aplicações mais organizadas, confiáveis e fáceis de manter.