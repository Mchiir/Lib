import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  stud_id: { type: String, required: true },
  stud_name: { type: String, required: true },
  stud_class: { type: String, required: true },
});

// Create a model based on the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;