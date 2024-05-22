import server from 'express'
import { plato, mesero, pedido } from './routes' 

const app = server()

app.use(server.json())

app.use('/plato', plato)
app.use('/mesero', mesero)
app.use('/pedido', pedido)


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})