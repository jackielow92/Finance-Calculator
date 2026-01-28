import express from 'express'
import cors from 'cors'
import { healthRoutes } from './routes/health.routes.js'
import { calculatorRoutes } from './routes/calculator.routes.js'
import { errorMiddleware } from './middleware/error.middleware.js'

const app = express()

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

// Routes
app.use('/api/health', healthRoutes)
app.use('/api/calculator', calculatorRoutes)

// Error handling
app.use(errorMiddleware)

export default app
