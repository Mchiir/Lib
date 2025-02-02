import validator from '../validators/studentValidator.js'
import { Student } from '../models/Student.js'
import Joi from 'joi'

// Create a new student
export async function createStudent(req, res) {
  try {
    // Validate the input data using Joi schema
    const { error, value } = validator.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { stud_id, stud_name, stud_class } = value

    // Check if the student already exists by stud_id (or any other unique identifier)
    const existingStudent = await Student.findOne({stud_id: stud_id})
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this ID already exists' })
    }

    // Create a new student document
    const newStudent = new Student({
      stud_id,
      stud_name,
      stud_class,
    })

    // Save the student to the database
    await newStudent.save()
    res.status(201).json({
      message: 'Student created successfully',
      student: newStudent.stud_name,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'An error occurred while creating the student' })
  }
}

// Add multiple students
export async function addStudents(req, res) {
  try {
    // Validate the input data
    if (!Array.isArray(req.body)) {
      return res.status(400).json({ message: 'Input must be an array of students' });
    }

    // Validate each student object
    const invalidStudents = [];
    const validStudents = [];
    for (const student of req.body) {
      const { error, value } = validator.validate(student);
      if (error) {
        invalidStudents.push({ student, error: error.details[0].message });
      } else {
        validStudents.push(value);
      }
    }

    if (invalidStudents.length > 0) {
      return res.status(400).json({ message: 'Validation failed for some students', invalidStudents });
    }

    // Check for duplicate stud_id
    const existingStudents = await Student.find({ stud_id: { $in: validStudents.map(s => s.stud_id) } });

    // Create an array of existing stud_ids
    const existingStudIds = existingStudents.map(s => s.stud_id);

    // Filter out students that already exist in the database
    const studentsToAdd = validStudents.filter(student => !existingStudIds.includes(student.stud_id));

    // If there are students to add
    if (studentsToAdd.length > 0) {
      // Insert new students
      await Student.insertMany(studentsToAdd);
    }

    // If there were students that already exist, respond accordingly
    const duplicateStudents = validStudents.filter(student => existingStudIds.includes(student.stud_id));

    res.status(201).json({
      message: 'Students added successfully',
      addedStudents: studentsToAdd,
      duplicateStudents: duplicateStudents.length > 0 ? duplicateStudents : undefined,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while adding students' });
  }
}

// Find a student by stud_id or stud_name
export async function findStudent(req, res) {
  try {
    // Access query parameters from req.query
    const { stud_id, stud_name, stud_class } = req.query;

    let query = {};

    // If stud_id is provided, add it to the query filter
    if (stud_id) {
      query.stud_id = stud_id;
    }

    // If stud_name is provided, add it to the query filter
    if (stud_name) {
      query.stud_name = stud_name;
    }

    if (stud_class) {
      const levelRegex = /^S[1-6]$/i; // Matches "S1", "S2", ..., "S6"
      const classRegex = /^S[1-6][A-D]$/i; // Matches "S1A", "S2B", ..., "S6D"

      if (levelRegex.test(stud_class)) {
        query.stud_class = { $regex: `^${stud_class}[A-D]$`, $options: 'i' }; // Case-insensitive regex for matching sections A-D
      } else if (classRegex.test(stud_class)) {
        query.stud_class = stud_class.toUpperCase(); // Convert to uppercase for consistent storage
      } else {
        return res.status(400).json({ message: 'Invalid class format. Use "S1" through "S6" for levels or "S1A" through "S6D" for full classes.' });
      }
    }

    // console.log('Query:', query);

    const students = await Student.find(query);

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found matching the criteria' });
    }

    res.status(200).json({ students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while finding the students' });
  }
}

// Get all students
export async function getAllStudents(req, res) {
  try {
    const students = await Student.find()
    if (students.length == 0) {
      return res.status(404).json({ message: 'Students not found' });
    }

    res.status(200).json({ students })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'An error occurred while retrieving the students' })
  }
}

export async function editStudent(req, res) {
  try {
    // Validate request body against the Joi schema
    const { error, value } = validator.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { _id } = req.params;

    // Find the student by stud_id
    const student = await Student.findOne({ _id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update student data
    const updatedStudent = await Student.findOneAndUpdate({ _id }, value, { new: true });

    res.status(200).json({
      message: 'Student updated successfully',
      student: updatedStudent,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating student', error: err.message });
  }
}

export async function deleteStudent(req, res) {
  try {
    const { _id } = req.params;

    // Find the student by stud_id
    const student = await Student.findOne({ _id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Delete the student
    const deletedStudent = await Student.deleteOne({ _id });

    res.status(200).json({
      message: 'Student deleted successfully',
      name: student.stud_name
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting student', error: err.message });
  }
}

export async function deleteAllStudents(req, res) {
  try {
    // Example: Check if the user is authorized (admin role or similar)
    // if (!req.user || req.user.role !== 'ADMIN') {
    //   return res.status(403).json({ message: 'Permission denied' });
    // }

    const result = await Student.deleteMany();

    // Check if any students were actually deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No students found to delete' });
    }

    res.status(200).json({
      message: 'All students deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting all students', error: err.message });
  }
}

export async function deleteBatchOfStudents(req, res) {
  try {
    const stud_ids = req.body; // An array of stud_ids

    // Ensure stud_ids is an array
    if (!Array.isArray(stud_ids) || stud_ids.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of student IDs' });
    }

    // Delete students in the provided array
    const result = await Student.deleteMany({ stud_id: { $in: stud_ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No students found for the provided IDs' });
    }

    res.status(200).json({
      message: `${result.deletedCount} students deleted successfully`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting batch of students', error: err.message });
  }
}