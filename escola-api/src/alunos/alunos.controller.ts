import {
  Controller, // Transforma a classe em um Controller, responsável por receber as requisições HTTP.
  Post, // Define uma rota POST, geralmente utilizada para cadastrar informações.
  Body, // Captura os dados enviados no corpo (body) da requisição.
  Get, // Define uma rota GET, utilizada para consultar informações.
  Param, // Captura parâmetros informados diretamente na URL.
  Patch, // Define uma rota PATCH, utilizada para atualizar parcialmente um registro.
  Delete, // Define uma rota DELETE, utilizada para excluir registros.
  Query, // Captura parâmetros enviados na URL após o sinal de interrogação (?).
  DefaultValuePipe, // Define um valor padrão quando um parâmetro não é informado.
  ParseIntPipe, // Converte o valor recebido para número inteiro e valida essa conversão.
} from '@nestjs/common';

// Importa o serviço que contém as regras de negócio relacionadas aos alunos.
import { AlunosService } from './alunos.service.js';

// Importa o DTO utilizado para estruturar e validar os dados de cadastro de um aluno.
import { CreateAlunoDto } from './dto/create-alunos.dto.js';

// Importa o DTO utilizado para estruturar e validar os dados de atualização de um aluno.
import { UpdateAlunoDto } from './dto/update-aluno.dto.js';

// Importa os decorators do Swagger utilizados para documentar e organizar as rotas da API.
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

// Define uma categoria chamada "alunos" no Swagger.
// Todas as rotas deste Controller aparecerão agrupadas nessa categoria.
@ApiTags('alunos')
// Define o caminho principal das rotas deste Controller.
// Como foi definido 'alunos', todas as rotas começam com /alunos.
@Controller('alunos')
export class AlunoController {
  // Injeta o AlunosService no Controller.
  // Isso permite utilizar os métodos do serviço para cadastrar, consultar,
  // atualizar e remover alunos.
  // private readonly indica que a propriedade é privada e não pode ser
  // substituída por outra instância depois de inicializada.
  constructor(private readonly alunoService: AlunosService) {}

  // =====================================================
  // CADASTRAR ALUNO
  // =====================================================

  // Define uma rota HTTP POST /alunos.
  // É utilizada para cadastrar um novo aluno.
  @Post()

  // Documenta a operação no Swagger.
  @ApiOperation({
    summary: 'Realiza o cadastro de um novo aluno.',
    description: 'Recebe os dados do aluno e realiza seu cadastro no sistema.',
  })

  // Documenta as possíveis respostas da requisição.
  @ApiResponse({
    status: 201, // Código HTTP 201: indica que o aluno foi cadastrado.
    description: 'Aluno cadastrado com sucesso.',
  })
  @ApiResponse({
    status: 400, // Código HTTP 400: indica que os dados enviados são inválidos.
    description: 'Dados inválidos ou informações obrigatórias não fornecidas.',
  })
  @ApiResponse({
    status: 500, // Código HTTP 500: indica um erro interno no servidor.
    description: 'Erro interno do servidor ao cadastrar o aluno.',
  })

  // O @Body() captura os dados enviados no corpo da requisição.
  // createAlunoDto recebe esses dados seguindo a estrutura definida no DTO.
  // Em seguida, chama o método create() do Service para realizar o cadastro.
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  // =====================================================
  // LISTAR TODOS OS ALUNOS (IMPLEMENTAÇÃO ANTIGA)
  // =====================================================

  // Este trecho representa uma implementação anterior da listagem.
  // Foi comentado porque a listagem atual utiliza paginação e filtros.

  // Define uma rota GET /alunos.
  // @Get()
  // @ApiOperation({
  //   summary: 'Retorna a lista de todos os alunos cadastrados com filtros opcionais.',
  //   description: 'Consulta e retorna todos os alunos registrados no sistema.',
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: 'Lista de alunos retornada com sucesso.',
  // })
  // @ApiResponse({
  //   status: 404,
  //   description: 'Nenhum aluno encontrado.',
  // })
  // @ApiResponse({
  //   status: 500,
  //   description: 'Erro interno do servidor ao consultar os alunos.',
  // })

  // Método antigo que chamava o Service para listar todos os alunos.
  // findAll() {
  //   return this.alunoService.findAll();
  // }

  // =====================================================
  // LISTAR ALUNOS COM PAGINAÇÃO, FILTROS E ORDENAÇÃO
  // =====================================================

  // Define uma rota GET /alunos.
  // Permite consultar os alunos utilizando paginação e filtros.
  @Get()

  // Documenta a finalidade dessa rota no Swagger.
  @ApiOperation({
    summary:
      'Retorna a lista de alunos cadastrados com paginação, filtros opcionais e ordenação.',
  })

  // Documenta os códigos de resposta da requisição.
  @ApiResponse({
    status: 200, // Consulta realizada com sucesso.
    description: 'Lista de alunos retornada com sucesso.',
  })
  @ApiResponse({
    status: 404, // Nenhum aluno encontrado, caso essa situação seja tratada assim pelo Service.
    description: 'Nenhum aluno encontrado.',
  })
  @ApiResponse({
    status: 500, // Erro interno durante a consulta.
    description: 'Erro interno do servidor ao consultar os alunos.',
  })

  // Documenta o parâmetro page no Swagger.
  @ApiQuery({
    name: 'page', // Nome do parâmetro recebido na URL.
    required: false, // Não é obrigatório informar a página.
    type: Number, // Tipo de dado esperado: número.
    description: 'Número da página(padrão: 1)',
  })

  // Documenta o parâmetro limit.
  @ApiQuery({
    name: 'limit', // Quantidade de alunos que serão retornados por página.
    required: false,
    type: Number,
    description: 'Itens por página(padrão: 10)',
  })

  // Documenta o filtro pelo curso.
  @ApiQuery({
    name: 'curso', // Nome do parâmetro utilizado para filtrar pelo curso.
    required: false,
    type: String,
    description: 'Filtra alunos pelo curso',
  })

  // Documenta o filtro pelo nome.
  @ApiQuery({
    name: 'nome', // Nome do parâmetro utilizado para filtrar pelo nome do aluno.
    required: false,
    type: String,
    description: 'Filtra alunos pelo nome',
  })

  // Documenta o parâmetro responsável por escolher o campo de ordenação.
  @ApiQuery({
    name: 'orderBy',
    required: true, // Se fosse true, o parâmetro seria obrigatório.
    type: String,
    description:
      'Ordena os resultados pelo campo especificado (Ex: nome, idade, matricula ou curso)',
  })

  // Documenta a direção em que os resultados podem ser ordenados.
  @ApiQuery({
    name: 'orderDirection',
    required: false,

    // Define os valores permitidos na documentação do Swagger.
    // asc = ordem crescente.
    // desc = ordem decrescente.
    enum: ['asc', 'desc'],

    description:
      'Define a direção da ordenação (asc para ascendente e desc para descendente)',
  })

  // Método responsável por receber os parâmetros da URL
  // e encaminhá-los para o método de consulta do Service.
  findAllPageFilter(
    // @Query('page') captura o número da página informado na URL.
    // DefaultValuePipe(1) define a página 1 quando o parâmetro não é informado.
    // ParseIntPipe converte o valor recebido para número inteiro.
    // Exemplo: ?page=2
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,

    // @Query('limit') captura a quantidade de registros por página.
    // DefaultValuePipe(10) define 10 como valor padrão.
    // ParseIntPipe converte o valor recebido para inteiro.
    // Exemplo: ?limit=10
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,

    // Captura o nome informado na URL para filtrar os alunos.
    // O símbolo ? indica que o parâmetro é opcional.
    // Exemplo: ?nome=João
    @Query('nome') nome?: string,

    // Captura o curso informado na URL para filtrar os alunos.
    // Também é opcional.
    // Exemplo: ?curso=Informática
    @Query('curso') curso?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderDirection') orderDirection?: 'asc' | 'desc',
  ) {
    // Encaminha os parâmetros recebidos para o método findAllPageFilter do Service.
    // O Service executa a consulta, aplicando a lógica de paginação e filtros.
    return this.alunoService.findAllPageFilter(page, limit, nome, curso, orderBy, orderDirection);
  }

  // =====================================================
  // BUSCAR ALUNO PELO ID
  // =====================================================

  // Define uma rota GET /alunos/:id.
  // O :id representa um valor variável que será informado na URL.
  // Exemplo: GET /alunos/5
  @Get(':id')

  // Documenta a operação no Swagger.
  @ApiOperation({
    summary: 'Busca um aluno específico pelo seu ID.',
    description:
      'Consulta os dados de um aluno utilizando seu identificador único.',
  })

  // Documenta as possíveis respostas.
  @ApiResponse({
    status: 200, // Aluno encontrado com sucesso.
    description: 'Aluno encontrado e retornado com sucesso.',
  })
  @ApiResponse({
    status: 404, // ID informado não corresponde a um aluno cadastrado.
    description: 'Aluno não encontrado pelo ID informado.',
  })
  @ApiResponse({
    status: 500, // Erro interno durante a consulta.
    description: 'Erro interno do servidor ao consultar o aluno.',
  })

  // @Param('id') captura o ID informado diretamente na URL.
  // O ID é recebido como string e enviado para o método findOne do Service.
  findOne(@Param('id') id: string) {
    return this.alunoService.findOne(id);
  }

  // =====================================================
  // ATUALIZAR ALUNO
  // =====================================================

  // Define uma rota PATCH /alunos/:id.
  // Utilizada para atualizar os dados de um aluno específico.
  // Exemplo: PATCH /alunos/5
  @Patch(':id')

  // Documenta a operação no Swagger.
  @ApiOperation({
    summary: 'Atualiza os dados de um aluno pelo seu ID.',
    description: 'Recebe o ID do aluno e os dados que deverão ser atualizados.',
  })

  // Documenta as possíveis respostas.
  @ApiResponse({
    status: 200, // Atualização realizada com sucesso.
    description: 'Dados do aluno atualizados com sucesso.',
  })
  @ApiResponse({
    status: 400, // Dados enviados para atualização são inválidos.
    description: 'Dados inválidos para atualização.',
  })
  @ApiResponse({
    status: 404, // Aluno não encontrado.
    description: 'Aluno não encontrado pelo ID informado.',
  })
  @ApiResponse({
    status: 500, // Erro interno durante a atualização.
    description: 'Erro interno do servidor ao atualizar o aluno.',
  })

  // @Param('id') captura o ID do aluno pela URL.
  // @Body() captura os dados enviados no corpo da requisição.
  // UpdateAlunoDto define a estrutura dos dados que podem ser atualizados.
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    // Encaminha o ID e os dados recebidos para o método update do Service.
    // O Service será responsável por executar a atualização.
    return this.alunoService.update(id, updateAlunoDto);
  }

  // =====================================================
  // REMOVER ALUNO
  // =====================================================

  // Define uma rota DELETE /alunos/:id.
  // Utilizada para excluir um aluno específico.
  // Exemplo: DELETE /alunos/5
  @Delete(':id')

  // Documenta a operação no Swagger.
  @ApiOperation({
    summary: 'Remove um aluno pelo seu ID.',
    description:
      'Exclui permanentemente o cadastro do aluno identificado pelo ID informado.',
  })

  // Documenta as possíveis respostas.
  @ApiResponse({
    status: 200, // Exclusão realizada com sucesso.
    description: 'Aluno removido com sucesso.',
  })
  @ApiResponse({
    status: 404, // ID não corresponde a um aluno cadastrado.
    description: 'Aluno não encontrado pelo ID informado.',
  })
  @ApiResponse({
    status: 500, // Erro interno durante a exclusão.
    description: 'Erro interno do servidor ao remover o aluno.',
  })

  // @Param('id') captura o ID informado na URL.
  // Em seguida, encaminha esse ID para o método remove do Service.
  remove(@Param('id') id: string) {
    return this.alunoService.remove(id);
  }
}
