import path from 'path'
import express from 'express'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
dotenv.config()

const PORT = process.env.PORT || 8000

connectDB()

const app = express()

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//Cookie Parser Middleware
app.use(cookieParser())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send({clientId: process.env.PAYPAL_CLIENT_ID})
)

app.use(notFound)
app.use(errorHandler)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running')
  })
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
