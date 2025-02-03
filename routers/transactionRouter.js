import { Router } from "express";
import { borrowBook } from "../controllers/transactionController.js";

const router = Router()

router.post('/borrowBook', borrowBook)


export { router as transactionRouter }