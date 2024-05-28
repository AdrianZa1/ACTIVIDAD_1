import  { Router } from "express";
import { PrismaClient } from '@prisma/client'

const router =  Router ();
const prisma = new PrismaClient()

router.get("/Examen", async (req, res) => {
    try {
      const examenes = await prisma.examen.findMany();
      res.json(examenes);
    } catch (error) {
      res.json({ error });
    }
  });
  
  // Obtener un examen por ID
  router.get("/Examen/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const examen = await prisma.examen.findUnique({
        where: { id: Number(id) },
      });
      res.json(examen);
    } catch (error) {
      res.json({ error });
    }
  });
  
  // Crear un nuevo examen
  router.post("/Examen", async (req, res) => {
    const {descricion } = req.body;
    try {
      const examenCreado = await prisma.examen.create({
        data: {
            descricion,
        },
      });
      res.json(examenCreado);
    } catch (error) {
      res.json({ error });
    }
  });
  
  // Actualizar un examen por ID
  router.put("/Examen/:id", async (req, res) => {
    const { id } = req.params;
    const { descricion } = req.body;
    try {
      const examenActualizado = await prisma.examen.update({
        where: { id: Number(id) },
        data: {
            descricion,
        },
      });
      res.json(examenActualizado);
    } catch (error) {
      res.json({ error });
    }
  });
  
  // Eliminar un examen por ID (marcar como eliminado)
  router.delete("/Examen/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.examen.delete({
        where: { id: Number(id) },
      });
      res.json("Examen eliminado");
    } catch (error) {
      res.json({ error });
    }
  });

export default router;