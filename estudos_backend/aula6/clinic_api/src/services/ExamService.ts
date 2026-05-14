import type { Exame } from "../prisma/generated/prisma/client";
import { ExamRepository, examRepository } from "../repositories/ExamRepository";

export class ExamService {
    constructor(private readonly repository: ExamRepository) { 
    }

    async buscarExames(pagina?: number, limite?: number) {
        const exames = await this.repository.buscarExames(pagina, limite);
        return exames
    }

    async buscarExame(id: number) {
        const exame = await this.repository.buscarExame(id);
        return exame
    }

    async cadastrarExame(dadosExame: Exame) {
        const exameCriado = await this.repository.criandoExame({
            tipo_exame: dadosExame.tipo_exame || '',
            valor: dadosExame.valor || '',
            resultado: dadosExame.resultado || '',
            data_exame: dadosExame.data_exame || '', 
            descricao: dadosExame.descricao || ''
        })
        return exameCriado
    }

    async atualizarExame(dadosExame: Exame) {
        const exameAtualizado = await this.repository.atualizarExame({
            tipo_exame: dadosExame.tipo_exame || '',
            valor: dadosExame.valor || '',
            resultado: dadosExame.resultado || '',
            data_exame: dadosExame.data_exame || '',
            descricao: dadosExame.descricao || ''

        })
        return exameAtualizado
    }

    async deletarExame(id: number){
        const exameDeletado = await this.repository.deletarExame(id)
        return exameDeletado
    }
}

export const examService = new ExamService(examRepository)