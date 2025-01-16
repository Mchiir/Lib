const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Route for creating a new user
router.post('/signup', authController.createUser);
router.post('/login', authController.login);

module.exports = router;