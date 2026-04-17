import { Router } from "express";
import { createHash } from "../utils/createHash";
import { prisma } from "../prisma/prisma";
import type { Usuario } from "../prisma/generated/prisma/client";
import { userController } from "../controllers/UserController";

export const userRouter = Router();

// Endpoints usuario

//pegar usuarios
userRouter.get("/usuarios", async (req, res) => {
  return userController.buscandoUsuarios(req, res)
})

//id
userRouter.get("/usuarios/:id", async (req, res) => {
  return userController.buscarUsuario(req, res)
})

//criando usuarios
userRouter.post("/usuarios", async (req, res) => {
  return userController.buscarUsuario(req, res)
})




//falta aq embaixo 
userRouter.put("/usuarios/:id", async (req, res) => {
  const idUsuario = Number(req.params.id)
  const dadosParaAtualizar = req.body as Omit<Usuario, 'id'>

  const usuarioAtualizado = await prisma.usuario.update({
    data: {
      ...dadosParaAtualizar
    },
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json(usuarioAtualizado);
})

userRouter.delete('/usuarios/:id', async (req, res) => {
  const idUsuario = Number(req.params.id)
  const usuarioDeletado = await prisma.usuario.delete({
    where: {
      id: idUsuario
    }
  })

  return res.status(200).json({
    mensagem: "Usuário deletado com sucesso!",
    data: usuarioDeletado
  });
})