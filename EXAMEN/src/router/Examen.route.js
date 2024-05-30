import  { Router } from "express";
import { PrismaClient } from '@prisma/client'

const router =  Router ();
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
    try {
      const examenes = await prisma.examen.findMany();
      res.json(examenes);
    } catch (error) {
      res.json({ error });
    }
  });
  
  // Obtener un examen por ID
  router.get("/:id", async (req, res) => {
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
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      // Obtener el examen que se va a eliminar para registrar el detalle
      const examen = await prisma.examen.findUnique({
        where: { id: Number(id) },
        include: { insumoevaluacion: { include: { pregunta: true } } } // Incluir la relación de insumoevaluacion y la pregunta asociada
      });
  
      // Eliminar el examen
      await prisma.examen.delete({
        where: { id: Number(id) }
      });
  
      // Obtener la pregunta asociada al examen
      const pregunta = examen.insumoevaluacion[0]?.pregunta || null;
  
      // Crear una nueva entrada en la tabla de Auditoria con los detalles de la pregunta
      await prisma.auditoria.create({
        data: {
          entidad: "Pregunta 8", // Se cambia la entidad a "Pregunta"
          detalle: pregunta ? `Eliminada pregunta: ${pregunta.pregunta}` : 'No se encontró la pregunta asociada',
          fecha: new Date(),
          id_auditoria: pregunta ? pregunta.id : null // ID de la pregunta si existe
        }
      });
  
      res.json("Examen eliminado y auditoría creada con la pregunta asociada");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
export default router;