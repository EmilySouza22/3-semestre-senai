import type { PrismaClient, Usuario } from "../prisma/generated/prisma/client";
import { prisma } from "../prisma/prisma";

export class UserRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = prisma
    }

    async buscarUsuarios() {
        return await this.prisma.usuario.findMany()
    }

    async buscarUsuario(id: number) {
        const idUsuario = Number(id)
        return await this.prisma.usuario.findUnique({
            where: {
                id: idUsuario
            }
        })
    }

    async criandoUsuario(dadosUsuario: Partial<Usuario>) {
        return await this.prisma.usuario.create({
            data: {
                email: dadosUsuario.email || "",
                senha: dadosUsuario.senha || "",
                nome: dadosUsuario.nome || ""
            }
        })
    }

    async atualizarUsuario(dadosUsuario: Partial<Usuario>) {
        return await this.prisma.usuario.update({
            data: {
                ...dadosUsuario
            },
            where: {
                id: dadosUsuario.id || 0
            }

        })
    }

    async deletarUsuario(id: number){
        return await this.prisma.usuario.delete({
            where: {
                id
            }
        })
    }

}

export const userRepository = new UserRepository(prisma)