import express from 'express'
import { createStudent,addStudents,findStudent,getAllStudents,editStudent,deleteStudent,deleteAllStudents,deleteBatchOfStudents } from '../controllers/studentController.js'

const router = express.Router()



// Route for creating a new user
router.post('/', createStudent)
router.post('/addMany', addStudents)
router.get('/', findStudent)
router.get('/getMany', getAllStudents)

router.put('/', editStudent)
router.delete('/', deleteStudent)
router.delete('/deleteAll', deleteAllStudents)
router.delete('/deleteBatch', deleteBatchOfStudents) // requst should be a an array of students to delete

export { router as studentRoutes }