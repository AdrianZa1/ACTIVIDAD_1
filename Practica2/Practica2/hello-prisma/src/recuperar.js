const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function recuperarTransaccion(id) {
  try {
    const transaccion = await prisma.insumoEvaluacion.findUnique({
      where: { id },
    });

    if (!transaccion) {
      throw new Error('Transacción no encontrada');
    }

    await prisma.insumoEvaluacion.update({
      where: { id },
      data: { Estado: true },
    });

    console.log('Transacción recuperada correctamente');
  } catch (error) {
    console.error('Error al recuperar transacción:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Llama a la función con el ID de la transacción que quieres recuperar
recuperarTransaccion(1);

