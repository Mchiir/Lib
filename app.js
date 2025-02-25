import "dotenv/config"
import { serve, setup } from 'swagger-ui-express'
import express, { json } from 'express'
// import assert from 'joi'

// Security modules
import morgan from "morgan"
import { helmet, cors, corsOptions, limiter } from './config/config.js'

// Swagger Documentation imports
import { createRequire } from "module";
const swaggerDocument = createRequire(import.meta.url)("./static/swagger.json");

// DB connectors
import { connectDB, disconnectDB } from './config/db.js' // Import connect and disconnect

// routers
import authRoutes from './routers/authRouter.js'
import { studentRoutes } from './routers/studentRouter.js'
import { router as bookRoutes } from './routers/bookRouter.js'
import { transactionRouter } from "./routers/transactionRouter.js";


const app = express()
app.use(helmet())
app.use(cors(corsOptions))
app.use(limiter)

if(app.get('env') == 'development'){
    app.use(morgan('tiny'))
}

app.use(json())

// Serve Swagger UI
app.use('/api-docs', serve, setup(swaggerDocument))

app.get('/', (req, res) => {
  res.send('Welcome to the Library Management System API')
})

app.use('/auth', authRoutes)
app.use('/book', bookRoutes)
app.use('/student', studentRoutes)
app.use('/transaction', transactionRouter)


// Gracefully shut down the server on SIGINT signal (ctrl+c)
process.on('SIGINT', async () => {
  console.log('Received SIGINT. Closing MongoDB connection...\nServer stopped successfully.');
  await disconnectDB(); // Disconnect from MongoDB gracefully
  process.exit(0); // Exit the process gracefully
});

// Server Port
const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
})
