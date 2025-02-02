import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  book_no: { 
    type: Number, 
    required: true,
    min: 1, 
    max: 9999999999, // Maximum of 10 digits
  },

  publisher: { 
    type: String, 
    required: true, 
    minlength: 3, 
    maxlength: 100, 
    match: /^[a-zA-Z0-9\s]+$/ // Alphanumeric and spaces
  },

  /* title: { type: String, required: true }, */
  category: { type: String, required: true, enum: [
    "Physics", "Mathematics", "Chemistry", "Biology",
    "History", "Literature", "Geography", "English",
    "Ikinyarwanda", "Entrepreneurship", "ICT"
  ] },
  
  level: { type: String, required: true },

  isAvailable: { type: Boolean, default: true },
})

export const Book = mongoose.model('Book', bookSchema)