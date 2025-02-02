import { Router } from 'express'
import {
  addBook,
  getAllBooks,
  findBook,
  updateBook,
  deleteBook,
  getByAvailability,
  deleteAllBooks
} from '../controllers/bookController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = Router()
router.use(verifyToken)

router.post('/', addBook)
router.get('/findAll', getAllBooks)
router.get('/getByAvailability', getByAvailability)
router.get('/findBook', findBook)

router.put('/:book_id', updateBook)
router.delete('/deleteById/:book_id', deleteBook)
router.delete('/deleteAll', deleteAllBooks)

export { router }