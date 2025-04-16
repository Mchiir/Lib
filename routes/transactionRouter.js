import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { 
    borrowBook, 
    returnBook, 
    deleteTransaction, 
    getAllTransactions, 
    getTransaction, 
    updateTransaction
    } from "../controllers/transactionController.js";

const router = Router()
router.use(verifyToken)

router.post('/borrowBook', borrowBook)
router.get('/findTransaction', getTransaction)
router.get('/getAllTransactions', getAllTransactions)

router.put('/returnBook', returnBook)
router.put('/updateTransaction/:transaction_id', updateTransaction)
router.delete('/deleteTransaction/:transaction_id', deleteTransaction)

export { router as transactionRouter }