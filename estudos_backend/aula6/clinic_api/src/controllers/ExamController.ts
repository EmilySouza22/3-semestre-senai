import type { Request, Response } from "express";
import type { Exame } from "../prisma/generated/prisma/client"
import { examService, type ExamService } from "../services/ExamService";

class ExamController {
    constructor(private readonly service: ExamService) {
    }

    async buscandoExames(req: Request, res: Response) {
        try {
            const exames = await this.service.buscarExames();
            return res.status(200).json({
                message: "Exames encontrados",
                data: exames
            });

        } catch (error) {
            console.log(error)
        }
    }

    async buscarExame(req: Request, res: Response) {
        try {
            const idExame = Number(req.params.id)
            const dadosExames = await this.service.buscarExame(idExame)
            return res.status(201).json({
                message: "Exame encontrado!",
                data: dadosExames
            })
        } catch (error) {
            console.log(error)
        }
    }

    async criandoExame(req: Request, res: Response) {
        try {
            const dadosExame = req.body as Exame
            const exameCriado = await this.service.cadastrarExame({
                ...dadosExame
            })
            return res.status(201).json({
                message: "Exame criado com sucesso",
                data: exameCriado
            })
        } catch (error) {
            console.log(error)
        }
    }

    async atualizandoExame(req: Request, res: Response) {
        try {
            const idExame = Number(req.params.id)
            const dadosExameAtualizar = req.body as Omit<Exame, 'id'>
            const exameAtualizado = await this.service.atualizarExame({
                ...dadosExameAtualizar, id: idExame
            })
            return res.status(200).json(exameAtualizado);
        } catch (error) {
            console.log(error)
        }
    }

    async deletandoExame(req: Request, res: Response) {
        try {
            const idExame = Number(req.params.id)
            const exameDeletado = await this.service.deletarExame(idExame)
            return res.status(200).json({
                mensagem: "Exame deletado com sucesso",
                data: exameDeletado
            })
        } catch (error) {
            console.log(error)
        }
    }

}

export const examController = new ExamController(examService)
