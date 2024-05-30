import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const auditorias = await prisma.auditoria.findMany();
    res.json(auditorias);
  } catch (error) {
    res.json({ error });
  }
});

// Obtener una auditoria por ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const auditoria = await prisma.auditoria.findUnique({
      where: { id: Number(id) },
    });
    res.json(auditoria);
  } catch (error) {
    res.json({ error });
  }
});

// Crear una nueva auditoria
router.post("/", async (req, res) => {
  const { entidad, detalle, fecha, id_auditoria } = req.body;
  try {
    const auditoriaCreada = await prisma.auditoria.create({
      data: {
        entidad,
        detalle,
        fecha,
        id_auditoria,
      },
    });
    res.json(auditoriaCreada);
  } catch (error) {
    res.json({ error });
  }
});

// Actualizar una auditoria por ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { entidad, detalle, fecha, id_auditoria } = req.body;
  try {
    const auditoriaActualizada = await prisma.auditoria.update({
      where: { id: Number(id) },
      data: {
        entidad,
        detalle,
        fecha,
        id_auditoria,
      },
    });
    res.json(auditoriaActualizada);
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      // Obtener la auditoría que se va a eliminar para obtener su descripción
      const auditoria = await prisma.auditoria.findUnique({
        where: { id: Number(id) }
      });
  
      // Eliminar la auditoría
      await prisma.auditoria.delete({
        where: { id: Number(id) }
      });
  
      // Crear una nueva entrada en la tabla de Examen con la descripción de la auditoría
      await prisma.examen.create({
        data: {
          descripcion: auditoria.entidad, // Utilizar la descripción de la auditoría como descripción del examen
          estado: "Activo" // Este valor depende de tu lógica de negocio
        }
      });
  
      res.json("Auditoría eliminada y examen creado con la descripción de la auditoría");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

export default router;
