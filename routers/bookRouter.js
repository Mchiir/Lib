import { Router } from 'express';
const router = Router();

import { index } from '../controllers/bookController.js';
import verifyToken from '../middlewares/authMiddleware.js';

// Route for creating a new user
router.get('/', verifyToken, index);

export default router;