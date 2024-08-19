import express from 'express'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
dotenv.config()

const PORT = process.env.PORT || 8000

connectDB()

const app = express()

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Cookie Parser Middleware
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
