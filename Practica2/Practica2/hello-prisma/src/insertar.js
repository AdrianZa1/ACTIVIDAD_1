import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function llenarDatos() {
  try {
    for (let i = 0; i < 10; i++) {
      const examen = await prisma.examen.create({
        data: {
          descripcion: 'Descripción del Examen ' + (i + 1)
        }
      });

      const pregunta = await prisma.pregunta.create({
        data: {
          pregunta: 'Pregunta ' + (i + 1),
          categoria: 'Categoría de la Pregunta ' + (i + 1),
          respuestacorrecta: i % 2 === 0 // Establece respuestas correctas en pares
        }
      });

      const insumoEvaluacion = await prisma.insumoEvaluacion.create({
        data: {
          pregunta: {
            connect: { id: pregunta.id }
          },
          examen: {
            connect: { id: examen.id }
          },
          valor: i + 1,
          estado: true // Establece el estado como verdadero para los nuevos registros
        }
      });

      console.log('Datos ingresados correctamente:', { examen, pregunta, insumoEvaluacion });
    }
  } catch (error) {
    console.error('Error al llenar datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  await llenarDatos();
}

main().catch(error => {
  console.error('Error en la ejecución:', error);
});

// Llama a la función para ingresar los datos iniciales
ingresarDatosIniciales();