import express from 'express'
const router = express.Router()

const studentController = require('../controllers/studentController.js')

// Route for creating a new user
router.post('/', studentController.createStudent)
router.post('/addMany', studentController.addStudents)
router.get('/', studentController.findStudent)
router.get('/getMany', studentController.getAllStudents)

router.put('/', studentController.editStudent)
router.delete('/', studentController.deleteStudent)
router.delete('/deleteAll', studentController.deleteAllStudents)
router.delete('/deleteBatch', studentController.deleteBatchOfStudents) // requst should be a an array of students to delete

export { router as studentRoutes }