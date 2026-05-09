import { Router } from "express";
import { prisma } from "../prisma/prisma"
import { Role } from "../prisma/generated/prisma/enums"
import { examController } from "../controllers/ExamController";
import { roleMiddleware } from "../middleware/role"

export const exameRouter = Router();
exameRouter.use(roleMiddleware([Role.ADMIN]))

//Exames

exameRouter.get("/exames", async (req, res) => {
  return examController.buscandoExames(req, res)
})

exameRouter.get('/exames/:id', async (req, res) => {
  return examController.buscarExame(req, res)
})

exameRouter.post("/exames", async (req, res) => {
  return examController.criandoExame(req, res)
})

exameRouter.put("/exames/:id", async (req, res) => {
  return examController.atualizandoExame(req, res)
})

exameRouter.delete('/exames/:id', async (req, res) => {
  return examController.deletandoExame(req, res)
})