import { Router } from "express";
import { userController } from "../controllers/UserController";
import { auth } from "../middleware/auth";
import { roleMiddleware } from "../middleware/role";
import { Role } from "../prisma/generated/prisma/enums";

export const userRouter = Router();

userRouter.get("/usuarios", auth, roleMiddleware([Role.ADMIN]), async (req, res) => {
  return userController.buscandoUsuarios(req, res)
})

userRouter.get("/usuarios/:id", auth, async (req, res) => {
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