import { Router } from "express";
import { userController } from "../controllers/UserController";

export const userRouter = Router();

userRouter.get("/usuarios", async (req, res) => {
  return userController.buscandoUsuarios(req, res)
})

userRouter.get("/usuarios/:id", async (req, res) => {
  return userController.buscarUsuario(req, res)
})

userRouter.post("/usuarios", async (req, res) => {
  return userController.criandoUsuario(req, res)
})

userRouter.put("/usuarios/:id", async (req, res) => {
  return userController.atualizandoUsuario(req, res)
})

userRouter.delete("/usuarios/:id", async (req, res) => {
  return userController.deletandoUsuario(req, res)
})