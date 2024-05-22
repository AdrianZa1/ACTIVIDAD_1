import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Obtener todos los pedidos
router.get("/", async (req, res) => {
    try {
      const pedidos = await prisma.pedido.findMany({
        where: { estado: "Activo" },
        include: {
          plato: true,
          mesero: true,
        },
      });
      res.json(pedidos);
    } catch (error) {
      res.json({ error });
    }
  });

// Obtener un pedido por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const pedido = await prisma.pedido.findUnique({
        where: { id: Number(id) },
        include: {
          plato: true,
          mesero: true,
        },
      });
      res.json(pedido);
    } catch (error) {
      res.json({ error });
    }
  });

// Crear un nuevo pedido
router.post("/", async (req, res) => {
    const { platoId, meseroId, fecha, mesa, cantidad, precio, estado = "Activo" } = req.body;
    try {
      const pedidoCreado = await prisma.pedido.create({
        data: {
          platoId,
          meseroId,
          fecha,
          mesa,
          cantidad,
          precio,
          estado,
        },
      });
      res.json(pedidoCreado);
    } catch (error) {
      res.json({ error });
    }
  });

// Actualizar un pedido por ID
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { platoId, meseroId, fecha, mesa, cantidad, precio, estado } = req.body;
    try {
      const pedidoActualizado = await prisma.pedido.update({
        where: { id: Number(id) },
        data: {
          platoId,
          meseroId,
          fecha,
          mesa,
          cantidad,
          precio,
          estado,
        },
      });
      res.json(pedidoActualizado);
    } catch (error) {
      res.json({ error });
    }
  });

// Eliminar un pedido por ID (marcar como eliminado)
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.pedido.update({
        where: { id: Number(id) },
        data: {
          estado: "Eliminado",
        },
      });
      res.json("Pedido marcado como eliminado");
    } catch (error) {
      res.json({ error });
    }
  });

export default router;