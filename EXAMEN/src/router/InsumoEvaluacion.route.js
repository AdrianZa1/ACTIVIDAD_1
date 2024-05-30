import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Obtener todos los insumos de evaluación
router.get("/", async (req, res) => {
  try {
    const insumosEvaluacion = await prisma.insumoEvaluacion.findMany();
    res.json(insumosEvaluacion);
  } catch (error) {
    res.json({ error });
  }
});

// Obtener un insumo de evaluación por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const insumoEvaluacion = await prisma.insumoEvaluacion.findUnique({
      where: { id: Number(id) },
    });
    res.json(insumoEvaluacion);
  } catch (error) {
    res.json({ error });
  }
});

// Crear un nuevo insumo de evaluación
router.post("/", async (req, res) => {
  const { preguntaid, examenID, valor, Estado = false } = req.body;
  try {
    const insumoEvaluacionCreado = await prisma.insumoEvaluacion.create({
      data: {
        preguntaid,
        examenID,
        valor,
        Estado,
      },
    });
    res.json(insumoEvaluacionCreado);
  } catch (error) {
    res.json({ error });
  }
});

// Actualizar un insumo de evaluación por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { preguntaid, examenID, valor, Estado } = req.body;
  try {
    const insumoEvaluacionActualizado = await prisma.insumoEvaluacion.update({
      where: { id: Number(id) },
      data: {
        preguntaid,
        examenID,
        valor,
        Estado,
      },
    });
    res.json(insumoEvaluacionActualizado);
  } catch (error) {
    res.json({ error });
  }
});

// Eliminar un insumo de evaluación por ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.insumoEvaluacion.delete({
      where: { id: Number(id) },
    });
    res.json("Insumo de evaluación eliminado");
  } catch (error) {
    res.json({ error });
  }
});

export default router;
