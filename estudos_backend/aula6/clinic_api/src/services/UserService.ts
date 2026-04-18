import { UserRepository, userRepository } from "../repositories/UserRepository";
import type { Usuario } from "../prisma/generated/prisma/client";
import { createHash } from "../utils/createHash";

export class UserService {
    constructor(private readonly repository: UserRepository) { 
    }

    async buscarUsuarios() {
        const usuarios = await this.repository.buscarUsuarios();
        return usuarios
    }

    async buscarUsuario(id: number) {
        const usuario = await this.repository.buscarUsuario(id);
        return usuario
    }

    async cadastrar(dadosUsuario: Usuario) {
        const hash = await createHash(dadosUsuario.senha || '');

        const usuarioCriado = await this.repository.criandoUsuario({
            email: dadosUsuario.email,
            nome: dadosUsuario.nome || null,
            senha: hash
        })
        return usuarioCriado
    }

    async atualizarUsuario(dadosUsuario: Usuario) {
        const usuarioAtualizado = await this.repository.atualizarUsuario({
            email: dadosUsuario.email,
            nome: dadosUsuario.nome || null,
            senha: dadosUsuario.senha || null
        })
        return usuarioAtualizado
    }

    async deletarUsuario(id: number){
        const usuarioDeletado = await this.repository.deletarUsuario(id)
        return usuarioDeletado
    }
}

export const userService = new UserService(userRepository)