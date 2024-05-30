import  { Router } from "express";
import { PrismaClient } from '@prisma/client'

const router =  Router ();
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
    try {
      const preguntas = await prisma.pregunta.findMany();
      res.json(preguntas);
    } catch (error) {
      res.json({ error });
    }
  });
  
  // Obtener una pregunta por ID
  router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const pregunta = await prisma.pregunta.findUnique({
        where: { id: Number(id) },
      });
      res.json(pregunta);
    } catch (error) {
      res.json({ error });
    }
  });
  
  // Crear una nueva pregunta
  router.post("/", async (req, res) => {
    const { pregunta, categoria, respuestacorrecta = false } = req.body;
    try {
      const preguntaCreada = await prisma.pregunta.create({
        data: {
          pregunta,
          categoria,
          respuestacorrecta,
        },
      });
      res.json(preguntaCreada);
    } catch (error) {
      res.json({ error });
    }
  });
  
  // Actualizar una pregunta por ID
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { pregunta, categoria, respuestacorrecta } = req.body;
    try {
      const preguntaActualizada = await prisma.pregunta.update({
        where: { id: Number(id) },
        data: {
          pregunta,
          categoria,
          respuestacorrecta,
        },
      });
      res.json(preguntaActualizada);
    } catch (error) {
      res.json({ error });
    }
  });
  
  // Eliminar una pregunta por ID
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.pregunta.delete({
        where: { id: Number(id) },
      });
      res.json("Pregunta eliminada");
    } catch (error) {
      res.json({ error });
    }
  });

export default router;