import express from 'express'

import ExamenRoutes from "./router/Examen.route.js";
import PreguntaRoutes from "./router/Pregunta.route.js";
import InsumoEvaluacionRoutes from "./router/InsumoEvaluacion.route.js";



const app = express()

app.use (express.json())

app.use('/api',ExamenRoutes)
app.use('/api',PreguntaRoutes)
app.use('/api',InsumoEvaluacionRoutes)


app.listen(3000)
console.log ('Servidor iniciado en el puerto',3000)