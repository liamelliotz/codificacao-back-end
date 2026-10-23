import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlunosService } from './alunos.service.js';
import { AlunoController } from './alunos.controller.js';
import { Aluno, AlunoSchema } from './schemas/aluno.schema.js';

@Module({
  imports: [MongooseModule.forFeature([{
        name: Aluno.name, schema: AlunoSchema,
      },
    ]),
  ],
  controllers: [AlunoController],
  providers: [AlunosService],
})
export class AlunosModule {}