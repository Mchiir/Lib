import _ from 'lodash'
import bookValidatorSchema from '../validators/bookValidator.js';
import { Book } from '../models/book.js';

// Add a new book
export async function addBook(req, res) {
  try {
    const { error, value } = bookValidatorSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { book_no, publisher, category, level, isAvailable } = value;

     // If isAvailable is not set, default to true
     const availability = isAvailable === undefined ? true : isAvailable;


    // Check if the book already exists
    const existingBook = await Book.findOne({ book_no });
    if (existingBook) {
      return res.status(400).json({ message: 'This book already exists in the library' });
    }

    // Create new book entry
    const newBook = new Book({ book_no, publisher, category, level, isAvailable: availability });
    await newBook.save();

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding book', error: err.message });
  }
}

// Get all books
export async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }
    res.status(200).json({ books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching books', error: err.message });
  }
}

const validateField = (field, regex, errorMessage) => {
  if (field && !regex.test(field)) {
    return { valid: false, message: errorMessage };
  }
  return { valid: true };
};

// Get a book
export async function findBook(req, res) {
  try {
    // Access query parameters from req.query
    const { book_id, book_no, publisher, title, category, level } = req.query;

    let query = {};

     // Validate book_id using Lodash isString
     if (book_id && _.isString(book_id)) {
      query._id = book_id;
    } else if (book_id) {
      return res.status(400).json({ message: 'Book ID must be a string.' });
    }

    // Validate book_no using Lodash isNumber, isInteger, and max digits check
if (book_no && _.isNumber(Number(book_no)) && _.isInteger(Number(book_no))) {
  const bookNoValue = Number(book_no);
  
  // Check if the number of digits is within the maximum allowed limit (10 digits)
  if (bookNoValue.toString().length <= 10) {
      query.book_no = bookNoValue;
    } else {
      return res.status(400).json({ message: 'Book number must be a valid integer with a maximum of 10 digits.' });
    }
  } else if (book_no) {
    return res.status(400).json({ message: 'Book number must be a valid integer.' });
  }

     // Validate publisher using Lodash isString and length check
     if (publisher && _.isString(publisher) && publisher.length >= 3 && publisher.length <= 100) {
      query.publisher = publisher;
    } else if (publisher) {
      return res.status(400).json({ message: 'Publisher must be a string between 3 and 100 characters.' });
    }

    // Validate title using Lodash isString and length check
    if (title && _.isString(title) && title.length >= 3 && title.length <= 200) {
      query.title = title;
    } else if (title) {
      return res.status(400).json({ message: 'Title must be a string between 3 and 200 characters.' });
    }

    // Validate category using Lodash isString and check if it's one of the allowed categories
    if (category && _.isString(category) && 
    ['Physics', 'Math', 'Chemistry', 'Biology', 'History', 'Literature', 'Geography', 'English', 'Kinyarwanda', 'Entrepreneurship', 'ICT']
    .includes(category)) {
      query.category = category;
    } else if (category) {
      return res.status(400).json({ message: 'Category must be a valid subject.' });
    }

    // Validate level using Lodash isString and match the level format
    if (level && _.isString(level) && /^S[1-6]$/i.test(level)) {
      query.level = level.toUpperCase();
    } else if (level) {
      return res.status(400).json({ message: 'Level must be in the format "S1", "S2", ..., "S6".' });
    }

    // Search for books based on the query
    const books = await Book.find(query);

     // If no books match the query
     if (_.isEmpty(books)) {
       return res.status(404).json({ message: 'No books found matching the criteria' });
     }
 
     // Return the found books
     res.status(200).json({ books });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while finding the books' });
  }
}


// Get available books
export async function getAvailableBooks(req, res) {
  try {
    const availableBooks = await Book.find({ isAvailable: true });
    if (availableBooks.length === 0) {
      return res.status(404).json({ message: 'No available books at the moment' });
    }
    res.status(200).json({ availableBooks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching available books', error: err.message });
  }
}

// Update book info
export async function updateBook(req, res) {
  try {
    const { book_id } = req.params;
    const { error, value } = bookValidatorSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedBook = await Book.findByIdAndUpdate(book_id, value, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating book', error: err.message });
  }
}


// Delete a book
export async function deleteBook(req, res) {
  try {
    const { book_id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(book_id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting book', error: err.message });
  }
}

// Delete all books
export async function deleteAllBooks(req, res) {
  try {
    const deletedBooks = await Book.deleteMany();

    if (deletedBooks.deletedCount === 0) {
      return res.status(404).json({ message: 'No books to delete' });
    }

    res.status(200).json({ message: `${deletedBooks.deletedCount} books deleted successfully` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting all books', error: err.message });
  }
}
