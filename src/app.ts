import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/products/product.route';
import { orderRouter } from './app/modules/orders/order.route';
const app:Application = express()


// Parser
app.use(express.json())
app.use(cors());

app.use('/api/products',ProductRoutes);
app.use('/api/orders',orderRouter)


app.get('/', (req:Request, res:Response) => {

  
  res.send('Hello World!')
})

export default app