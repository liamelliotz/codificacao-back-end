# Aula 08-09 — API REST com NestJS

Nesta aula foi desenvolvida uma **API REST** utilizando **NestJS**, praticando os métodos HTTP `GET`, `POST`, `PATCH` e `DELETE`.

## 🚀 Tecnologias

- Node.js
- NestJS
- TypeScript
- REST API

## 📌 Rotas

| Método | Rota | Função |
|---|---|---|
| GET | `/convidados` | Lista convidados |
| POST | `/convidados` | Recebe dados |
| PATCH | `/convidados/:id` | Atualiza a idade |
| DELETE | `/convidados/:id` | Remove convidado |

## 🔎 GET

```ts
@Get()
listarConvidados() {
    return this.convidadosService.listarConvidados();
}
```

## ➕ POST

```ts
@Post()
criarConvidado(@Body() criarConvidado: CriarConvidadoDto) {
    return {
        mensagem: `Convidado(a) ${criarConvidado.nome}, foi adicionado(a) com sucesso!`,
        dados: criarConvidado,
    };
}
```

## ✏️ PATCH

```ts
@Patch(':id')
atualizarIdade(@Param('id') id: string, @Body('idade') idade: number) {
    return this.convidadosService.atualizarIdade(+id, idade);
}
```

## 🗑️ DELETE

```ts
@Delete(':id')
@HttpCode(204)
removerConvidado(@Param('id') id: string) {
    this.convidadosService.removerConvidadoLista(+id);
}
```

## ⚙️ Service

```ts
@Injectable()
export class ConvidadosService {
    private convidados = [
        { id: 1, nome: 'Rebeca', idade: 20 },
        { id: 2, nome: 'Leonardo', idade: 18 },
        { id: 3, nome: 'Sergio', idade: 18 },
        { id: 4, nome: 'Jamily', idade: 22 },
        { id: 5, nome: 'Alvaro', idade: 21 },
    ];

    listarConvidados() {
        return this.convidados;
    }

    encontrarConvidado(id: number) {
        const convidado = this.convidados.find(
            (buscarConvidado) => buscarConvidado.id === id
        );

        if (!convidado) {
            throw new NotFoundException(
                `[ADMINISTRADOR] Convidado com ID ${id} não encontrado!`
            );
        }

        return convidado;
    }

    atualizarIdade(id: number, idade: number) {
        const convidado = this.encontrarConvidado(id);
        convidado.idade = idade;

        return convidado;
    }

    removerConvidadoLista(id: number) {
        const index = this.convidados.findIndex(
            (convidados) => convidados.id === id
        );

        if (index === -1) {
            throw new NotFoundException(
                `[ADMINISTRADOR] Convidado com ID ${id} não encontrado!`
            );
        }

        return this.convidados.splice(index, 1);
    }
}
```

## 🎯 Objetivo

Praticar a criação de uma **API REST com NestJS**, utilizando Controllers, Services, parâmetros, `@Body()`, tratamento de erros e métodos HTTP.
