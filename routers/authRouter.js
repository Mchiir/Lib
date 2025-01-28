import { Router } from 'express'
const router = Router()

import { createUser, login, getUser, getAllUsers, updateUser, deleteUser } from '../controllers/authController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

// Route for creating a new user
router.post('/signup', createUser)
router.post('/login', login)

router.get('/',verifyToken, getUser)
router.get('/all', verifyToken, getAllUsers)

router.put('/',verifyToken, updateUser)
router.delete('/', verifyToken, deleteUser)

export default router