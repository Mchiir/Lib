import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  stud_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  borrow_date: {
    type: Date,
    default: Date.now,
    required: true
  },
  return_date: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['borrowed', 'returned'],
    default: 'borrowed'
  },
  history: [
    {
      action: {
        type: String,
        enum: ['borrowed', 'returned'],
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

// Create a model based on the schema
const Transaction = mongoose.model('Transaction', transactionSchema)

export default Transaction