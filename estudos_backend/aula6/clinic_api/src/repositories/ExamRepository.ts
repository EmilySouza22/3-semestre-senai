import type { Exame, PrismaClient } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class ExamRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async buscarExames(pagina?: number, limite?: number) {
        const existePaginacao = pagina! && limite!
        if(!existePaginacao) return await prisma.exame.findMany()
        const exames = await prisma.exame.findMany({
            skip: (pagina - 1) * limite, 
            take: limite
        })

        const total = await prisma.exame.count();
        const totalPaginas = Math.ceil(total / limite)
        
        return {
            exames, 
            total,
            totalPaginas
        }
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
                data_exame: dadosExame.data_exame || '',
                descricao: dadosExame.descricao || ''
            }
        })
    }

    async atualizarExame(dadosExame: Partial<Exame>) {
        return await this.prisma.exame.update({
            data: {
                tipo_exame: dadosExame.tipo_exame || '',
                valor: dadosExame.valor || '',
                resultado: dadosExame.resultado || '',
                data_exame: dadosExame.data_exame || '',
                descricao: dadosExame.descricao || ''
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