import express from 'express';

import ExamenRoutes from "./router/Examen.route.js";
import PreguntaRoutes from "./router/Pregunta.route.js";
import InsumoEvaluacionRoutes from "./router/InsumoEvaluacion.route.js";
import AuditoriaRoutes from "./router/Auditoria.route.js"; // Corregido: Se corrigió la importación

const app = express();

app.use(express.json());

app.use('/examen', ExamenRoutes);
app.use('/pregunta', PreguntaRoutes);
app.use('/insumo', InsumoEvaluacionRoutes);
app.use('/auditoria', AuditoriaRoutes); // Agregada la ruta de Auditoria

app.listen(3000);
console.log('Servidor iniciado en el puerto 3000');
