const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const authenticateJWT = require('../middlewares/authMiddleware');

// Route for creating a new user
router.get('/', authenticateJWT, bookController.index);

module.exports = router;