require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./static/swagger.json') // Swagger JSON documentation file
const { connectDB, disconnectDB } = require('./config/db'); // Import connect and disconnect

const app = express()

// Middleware
app.use(express.json())

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

connectDB(); // Connecting to MongoDB

app.get('/', (req, res)=>{
    res.send('Welcome to the Library Management System API')
})

const authRoutes = require('./routes/authRoutes')
app.use(authRoutes)


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