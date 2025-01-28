import express from 'express'
import { createStudent, addStudents, findStudent, getAllStudents, editStudent, deleteStudent, deleteAllStudents, deleteBatchOfStudents } from
    '../controllers/studentController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()
// Protected routes (JWT required)
router.use(verifyToken); // Apply JWT authentication to all routes below

// Route for creating a new user
router.post('/', createStudent)
router.post('/addMany', addStudents)
router.get('/', findStudent)
router.get('/getAll', getAllStudents)

router.put('/:_id', editStudent)
router.delete('/deleteOne/:_id', deleteStudent)
router.delete('/deleteAll', deleteAllStudents)
router.delete('/deleteBatch', deleteBatchOfStudents) // requst should be a an array of students to delete

export { router as studentRoutes }