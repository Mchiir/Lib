const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')

// Route for creating a new user
router.post('/signup', authController.createUser)
router.post('/login', authController.login)

router.get('/', authController.getUser)
router.get('/all', authController.getAllUsers)

router.put('/', authController.updateUser)
router.delete('/', authController.deleteUser)

module.exports = router