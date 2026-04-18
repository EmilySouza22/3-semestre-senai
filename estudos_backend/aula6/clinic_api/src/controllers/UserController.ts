import type { Request, Response } from "express";
import type { Usuario } from "../prisma/generated/prisma/client"
import { UserService, userService } from "../services/UserService";
import { createHash } from "../utils/createHash";

class UserController {
    constructor(private readonly service: UserService) {
    }

    async buscandoUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await this.service.buscarUsuarios();
            return res.status(200).json({
                message: "Usuários encontrados",
                data: usuarios
            });

        } catch (error) {
            console.log(error)
        }
    }

    async buscarUsuario(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const dadosBuscaUsuario = await this.service.buscarUsuario(idUsuario)
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
            const usuarioCriado = await this.service.cadastrar({
                ...dadosUsuario, senha: hash
            })
            return res.status(201).json({
                message: "Usuário criado com sucesso",
                data: usuarioCriado
            })
        } catch (error) {
            console.log(error)
        }
    }

    async atualizandoUsuario(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const dadosAtualizar = req.body as Omit<Usuario, 'id'>
            const usuarioAtualizado = await this.service.atualizarUsuario({
                ...dadosAtualizar, id: idUsuario
            })
            return res.status(200).json(usuarioAtualizado);
        } catch (error) {
            console.log(error)
        }
    }

    async deletandoUsuario(req: Request, res: Response) {
        try {
            const idUsuario = Number(req.params.id)
            const usuarioDeletado = await this.service.deletarUsuario(idUsuario)
            return res.status(200).json({
                mensagem: "Usuário deletado com sucesso",
                data: usuarioDeletado
            })
        } catch (error) {
            console.log(error)
        }
    }

}

export const userController = new UserController(userService)
