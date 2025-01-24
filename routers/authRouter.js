import { Router } from 'express'
const router = Router()

import { createUser, login, getUser, getAllUsers, updateUser, deleteUser } from '../controllers/authController.js'

// Route for creating a new user
router.post('/signup', createUser)
router.post('/login', login)

router.get('/', getUser)
router.get('/all', getAllUsers)

router.put('/', updateUser)
router.delete('/', deleteUser)

export default router