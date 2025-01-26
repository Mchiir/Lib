import validator from '../validators/studentValidator.js'

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
    const existingStudent = await findOne({ stud_id })
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
      return res.status(400).json({ message: 'Input must be an array of students' })
    }

    // Validate each student object
    const invalidStudents = []
    const validStudents = []
    for (const student of req.body) {
      const { error, value } = validator.validate(student)
      if (error) {
        invalidStudents.push({ student, error: error.details[0].message })
      } else {
        validStudents.push(value)
      }
    }

    if (invalidStudents.length > 0) {
      return res.status(400).json({ message: 'Validation failed for some students', invalidStudents })
    }

    // Save all valid students in the database
    await insertMany(validStudents)
    res.status(201).json({
      message: 'Students added successfully',
      addedStudents: validStudents,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'An error occurred while adding students' })
  }
}

// Find a student by stud_id or stud_name
export async function findStudent(req, res) {
  try {
    const { stud_id, stud_name } = req.query

    let query = {}
    if (stud_id) {
      query.stud_id = stud_id
    }
    if (stud_name) {
      query.stud_name = stud_name
    }

    // Search for student in the database
    const student = await findOne(query)
    if (!student) {
      return res.status(404).json({ message: 'Student not found' })
    }

    res.status(200).json({ student })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'An error occurred while finding the student' })
  }
}

// Get all students
export async function getAllStudents(req, res) {
  try {
    const students = await find()
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

    const { stud_id } = req.body;

    // Find the student by stud_id
    const student = await findOne({ stud_id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update student data
    const updatedStudent = await findOneAndUpdate({ stud_id }, value, { new: true });

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
    const { stud_id } = req.body;

    // Find the student by stud_id
    const student = await findOne({ stud_id });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Delete the student
    await deleteOne({ stud_id });

    res.status(200).json({
      message: 'Student deleted successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting student', error: err.message });
  }
}

export async function deleteAllStudents(req, res) {
  try {
    // Delete all students from the collection
    await deleteMany({});

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
    const { stud_ids } = req.body; // An array of stud_ids

    // Ensure stud_ids is an array
    if (!Array.isArray(stud_ids) || stud_ids.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of student IDs' });
    }

    // Delete students in the provided array
    const result = await deleteMany({ stud_id: { $in: stud_ids } });

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