import { PartialType } from "@nestjs/swagger";
import { CreateAlunoDto } from "./create-alunos.dto.js";

export class UpdateAlunoDto extends PartialType(CreateAlunoDto) {
    nome: string;
    idade: number;
    matricula: string;
    cursos:[];
}