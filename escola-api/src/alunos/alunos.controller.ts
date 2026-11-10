import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';

import { AlunosService } from './alunos.service.js';
import { CreateAlunoDto } from './dto/create-alunos.dto.js';
import { UpdateAlunoDto } from './dto/update-aluno.dto.js';

import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('alunos')
@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunosService) {}

  // Criar aluno
  @Post()
  @ApiOperation({
    summary: 'Realiza o cadastro de um novo aluno.',
    description: 'Recebe os dados do aluno e realiza seu cadastro no sistema.',
  })
  @ApiResponse({
    status: 201,
    description: 'Aluno cadastrado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou informações obrigatórias não fornecidas.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor ao cadastrar o aluno.',
  })
  create(@Body() createAlunoDto: CreateAlunoDto) {
    return this.alunoService.create(createAlunoDto);
  }

  // Listar todos os alunos
//  @Get()
//  @ApiOperation({
//    summary: 'Retorna a lista de todos os alunos cadastrados.',
//    description: 'Consulta e retorna todos os alunos registrados no sistema.',
//  })
//  @ApiResponse({
//    status: 200,
//    description: 'Lista de alunos retornada com sucesso.',
//  })
//  @ApiResponse({
//    status: 404,
//    description: 'Nenhum aluno encontrado.',
//  })
//  @ApiResponse({
//    status: 500,
//    description: 'Erro interno do servidor ao consultar os alunos.',
//  })
//  findAll() {
//    return this.alunoService.findAll();
//  }

  @Get()
  @ApiOperation({
    summary: 'Retorna a lista de alunos cadastrados com paginação.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de alunos retornada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum aluno encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor ao consultar os alunos.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número da página(padrão: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Itens por página(padrão: 10',
  })
  findAllPage(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ) {
    return this.alunoService.findAllPage(page, limit);
  }

  // Buscar aluno por ID
  @Get(':id')
  @ApiOperation({
    summary: 'Busca um aluno específico pelo seu ID.',
    description:
      'Consulta os dados de um aluno utilizando seu identificador único.',
  })
  @ApiResponse({
    status: 200,
    description: 'Aluno encontrado e retornado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Aluno não encontrado pelo ID informado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor ao consultar o aluno.',
  })
  findOne(@Param('id') id: string) {
    return this.alunoService.findOne(id);
  }

  // Atualizar aluno
  @Patch(':id')
  @ApiOperation({
    summary: 'Atualiza os dados de um aluno pelo seu ID.',
    description: 'Recebe o ID do aluno e os dados que deverão ser atualizados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Dados do aluno atualizados com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos para atualização.',
  })
  @ApiResponse({
    status: 404,
    description: 'Aluno não encontrado pelo ID informado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor ao atualizar o aluno.',
  })
  update(@Param('id') id: string, @Body() updateAlunoDto: UpdateAlunoDto) {
    return this.alunoService.update(id, updateAlunoDto);
  }

  // Remover aluno
  @Delete(':id')
  @ApiOperation({
    summary: 'Remove um aluno pelo seu ID.',
    description:
      'Exclui permanentemente o cadastro do aluno identificado pelo ID informado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Aluno removido com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Aluno não encontrado pelo ID informado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno do servidor ao remover o aluno.',
  })
  remove(@Param('id') id: string) {
    return this.alunoService.remove(id);
  }
}