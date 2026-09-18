#  Aula 05 — Variáveis de Ambiente e Configuração

## Sobre a aula

Nesta **Aula 05**, foi desenvolvido um serviço de configuração com o objetivo de compreender como uma aplicação pode utilizar **variáveis de ambiente** para definir informações de configuração durante sua execução.

O projeto trabalha com configurações como **porta da aplicação**, **chave de API para pagamento** e **URL do banco de dados**, além de realizar uma validação para impedir a inicialização quando uma configuração obrigatória não estiver disponível.

---

## Objetivo

O objetivo da aula é aprender a:

- Utilizar variáveis de ambiente em uma aplicação;
- Definir valores padrão para configurações;
- Validar configurações obrigatórias;
- Trabalhar com informações de configuração sem deixá-las fixas no código;
- Exibir informações do serviço durante sua inicialização.

---

## Funcionamento

A aplicação possui uma função chamada `iniciarAplicacao()`, responsável por carregar as configurações necessárias.

Durante a inicialização, são obtidas as seguintes informações:

- **PORT:** define a porta utilizada pelo serviço. Caso não seja informada, a aplicação utiliza a porta `8080`;
- **API_KEY_PAGAMENTO:** representa a chave utilizada pela API de pagamento;
- **DATABASE_URL:** representa o endereço de conexão com o banco de dados.

Antes de continuar a execução, a aplicação verifica se a `API_KEY_PAGAMENTO` existe.

Caso a chave não esteja configurada, é apresentada uma mensagem de erro e o processo é encerrado.

---

## Variáveis utilizadas

| Variável | Função | Obrigatória |
|---|---|---|
| `PORT` | Define a porta do serviço | Não |
| `API_KEY_PAGAMENTO` | Chave de autenticação da API de pagamento | Sim |
| `DATABASE_URL` | URL de conexão com o banco de dados | Não |

### Porta padrão

Quando a variável `PORT` não é informada, o sistema utiliza automaticamente:

8080