import { Router } from 'express'
import {
  addBook,
  getAllBooks,
  findBook,
  updateBook,
  deleteBook,
  getAvailableBooks,
  deleteAllBooks
} from '../controllers/bookController.js'

const router = Router()

router.post('/', addBook)
router.get('/findAll', getAllBooks)
router.get('/getAvailable/available', getAvailableBooks)
router.get('/findBook', findBook)

router.put('/:book_id', updateBook)
router.delete('/deleteById/:book_id', deleteBook)
router.delete('/deleteAll', deleteAllBooks)

export { router }