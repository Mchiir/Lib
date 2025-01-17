const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  stud_id: { type: String, required: true },
  stud_name: { type: String, required: true },
  stud_class: { type: String, required: true },
  book_no: { type: Number, required: true },
  book_name: { type: String, required: true },
  borrowing_date: { type: Date },
  return_date: { type: Date },
  status: { 
    type: String, 
    enum: ['borrowed', 'returned'], 
    required: true 
  }
});

// Create a model based on the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;