import { Router } from "express";
import { examController } from "../controllers/ExamController";

export const exameRouter = Router();

//Exames

exameRouter.get("/usuarios", async (req, res) => {
  return examController.buscandoExames(req, res)
})

exameRouter.get("/usuarios", async (req, res) => {
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