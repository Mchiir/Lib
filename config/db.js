import { connect, disconnect } from 'mongoose'

// Database connection URL (it will be pulled from .env file)
const dbURI = process.env.MONGO_URI

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

// console.log(dbURI)

/**
 * Connect to MongoDB
 */
const connectDB = async () => {
  try {
    // Try to connect to the database using mongoose
    await connect(dbURI)
    console.log('MongoDB connected...')
  } catch (err) {
    // Handle connection errors
    console.error('Error connecting to MongoDB:', err)
    process.exit(1) // Exit the process if DB connection fails
  }
}

/**
 * Close MongoDB connection gracefully
 */
const disconnectDB = async () => {
  try {
    await disconnect()
    console.log('MongoDB disconnected...')
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err)
  }
}

export { connectDB, disconnectDB }