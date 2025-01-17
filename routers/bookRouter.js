const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');
const verifyToken = require('../middlewares/authMiddleware');

// Route for creating a new user
router.get('/', verifyToken, bookController.index);

module.exports = router;