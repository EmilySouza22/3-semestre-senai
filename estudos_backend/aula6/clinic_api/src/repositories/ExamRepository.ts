import type { Exame, PrismaClient, Usuario } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class ExamRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async buscarExames() {
        return await this.prisma.exame.findMany()
    }

    async buscarExame(id: number) {
        const idExame = Number(id)
        return await this.prisma.exame.findUnique({
            where: {
                id: idExame
            }
        })
    }

    async criandoExame(dadosExame: Partial<Exame>) {
        return await this.prisma.exame.create({
            data: {
                tipo_exame: dadosExame.tipo_exame || '',
                valor: dadosExame.valor || '',
                resultado: dadosExame.resultado || '',
                data_exame: dadosExame.data_exame || ''
            }
        })
    }

    async atualizarExame(dadosExame: Partial<Exame>) {
        return await this.prisma.exame.update({
            data: {
                ...dadosExame
            },
            where: {
                id: dadosExame.id || 0
            }

        })
    }

    async deletarExame(id: number){
        return await this.prisma.exame.delete({
            where: {
                id
            }
        })
    }

}

export const examRepository = new ExamRepository(prisma)