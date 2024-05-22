import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Obtener todos los meseros
router.get("/", async (req, res) => {
  try {
    const meseros = await prisma.mesero.findMany({
      where: { estado: "Activo" },
    });
    res.json(meseros);
  } catch (error) {
    res.json({ error });
  }
});

// Obtener un mesero por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const mesero = await prisma.mesero.findUnique({
      where: { id: Number(id) },
    });
    res.json(mesero);
  } catch (error) {
    res.json({ error });
  }
});

// Crear un nuevo mesero
router.post("/", async (req, res) => {
  const { nombre, sueldo_basico, nivel, estado = "Activo" } = req.body;
  try {
    const meseroCreado = await prisma.mesero.create({
      data: {
        nombre,
        sueldo_basico,
        nivel,
        estado,
      },
    });
    res.json(meseroCreado);
  } catch (error) {
    res.json({ error });
  }
});

// Actualizar un mesero por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, sueldo_basico, nivel, estado } = req.body;
  try {
    const meseroActualizado = await prisma.mesero.update({
      where: { id: Number(id) },
      data: {
        nombre,
        sueldo_basico,
        nivel,
        estado,
      },
    });
    res.json(meseroActualizado);
  } catch (error) {
    res.json({ error });
  }
});

// Eliminar un mesero por ID (marcar como eliminado)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.mesero.update({
      where: { id: Number(id) },
      data: {
        estado: "Eliminado",
      },
    });
    res.json("Mesero marcado como eliminado");
  } catch (error) {
    res.json({ error });
  }
});

export default router;