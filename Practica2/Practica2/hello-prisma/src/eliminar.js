import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function eliminarInsumoEvaluacion(id) {
  try {
    const insumoEvaluacion = await prisma.insumoEvaluacion.findUnique({
      where: { id },
    });

    if (!insumoEvaluacion) {
      throw new Error('InsumoEvaluacion no encontrado');
    }

    await prisma.insumoEvaluacion.update({
      where: { id },
      data: { estado: false },
    });

    console.log('InsumoEvaluacion eliminado correctamente');
  } catch (error) {
    console.error('Error al eliminar InsumoEvaluacion:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Llama a la función con el ID de la transacción que quieres eliminar
eliminarInsumoEvaluacion(1);
