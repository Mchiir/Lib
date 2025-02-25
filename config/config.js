import helmet from "helmet"
import cors from "cors"
import rateLimit from "express-rate-limit"
import { allowedOrigins } from "./origins.js"

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.REQ_MAX || 50, // Limit max req to max per window
  message: "Too many requests from this IP, please try again later."
})

// Configure CORS middleware with allowed origins
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true
}

// Export middleware functions
export { helmet, cors, corsOptions, limiter }