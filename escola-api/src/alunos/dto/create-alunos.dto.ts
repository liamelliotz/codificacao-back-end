import {
  IsString,
  IsInt,
  IsNotEmpty,
  IsArray,
  Min,
  ArrayMinSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlunoDto {
  @ApiProperty({
    example: 'João da Silva',
    description: 'Nome completo do aluno',
  })
  @IsString()
  @IsNotEmpty({
    message: 'O nome é obrigatório e não pode ser vazio.',
  })
  nome: string;

  @ApiProperty({
    example: 20,
    description: 'Idade do aluno em anos',
  })
  @IsInt({
    message: 'A idade deve ser um número inteiro.',
  })
  @Min(0, {
    message: 'A idade não pode ser negativa.',
  })
  idade: number;

  @ApiProperty({
    example: '1234',
    description: 'Número de matrícula do aluno',
  })
  @IsString()
  @IsNotEmpty({
    message: 'A matrícula é obrigatória e não deve ser vazia.',
  })
  matricula: string;

  @ApiProperty({
    example: ['Ciência da Computação', 'Recursos Humanos'],
    description: 'Cursos em que o aluno está matriculado',
  })
  @IsArray()
  @IsString({
    each: true,
    message: 'Cada curso deve ser em texto.',
  })
  @ArrayMinSize(1, {
    message: 'O aluno deve estar matriculado em pelo menos um curso.',
  })
  cursos: string[];
}
