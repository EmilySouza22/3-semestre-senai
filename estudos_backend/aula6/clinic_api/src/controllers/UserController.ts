import type { Request, Response } from "express";
import type { Usuario } from "../prisma/generated/prisma/client"
import { UserService, userService } from "../services/UserService";
import { createHash } from "node:crypto";
import { prisma } from "../prisma/prisma";

class UserController {
    constructor(private readonly service: UserService) {
    }

    //encontrando varios
    async buscandoUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await prisma.usuario.findMany();
            return res.status(200).json({
                message: "Usuários encontrados",
                data: usuarios
            });

        } catch (error) {
            console.log(error)
        }
    }

    //buscando por id
    async buscarUsuario(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const dadosBuscaUsuario = await this.service.findUnique(idUsuario)
            return res.status(201).json({
                message: "Usuário encontrado!",
                data: dadosBuscaUsuario
            })
        } catch (error) {
            console.log(error)
        }
    }

    async criandoUsuario(req: Request, res: Response) {
        try {
            const dadosUsuario = req.body as Usuario
            const hash = await createHash(dadosUsuario.senha || '');
            const usuarioCriado = await prisma.usuario.create({
                data: {
                    email: dadosUsuario.email,
                    nome: dadosUsuario.nome || null,
                    senha: hash
                }
            })
            return res.status(201).json({
                message: "Usuário criado com sucesso",
                data: usuarioCriado
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const userController = new UserController(userService)
