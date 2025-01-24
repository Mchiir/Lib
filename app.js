import { config } from 'dotenv'
import express, { json } from 'express'
import mongoose from 'mongoose'
import { serve, setup } from 'swagger-ui-express'

const require = createRequire(import.meta.url)
const swaggerDocument = require('./static/swagger.json'); 
// Swagger JSON documentation file
import { connectDB, disconnectDB } from './config/db.js' // Import connect and disconnect


config()
const app = express()

app.use(json())

// Serve Swagger UI
app.use('/api-docs', serve, setup(swaggerDocument))

connectDB(); // Connecting to MongoDB

app.get('/', (req, res) => {
  res.send('Welcome to the Library Management System API')
})

import authRoutes from './routers/authRouter.js'
import studentRoutes from './routers/studentRouter.js'
import bookRoutes from './routers/bookRouter.js'
import { assert } from 'joi'

app.use('/auth', authRoutes)
app.use('/book', bookRoutes)
app.use('/student', studentRoutes)


// Gracefully shut down the server on SIGINT signal (ctrl+c)
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing MongoDB connection...\nServer stopped successfully.');
  await disconnectDB(); // Disconnect from MongoDB gracefully
  process.exit(0); // Exit the process gracefully
});

// Server Port
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})