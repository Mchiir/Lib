import Transaction from '../models/transaction.js'
import { Book } from '../models/book.js'
import transactionSchema from '../validators/transactionValidator.js'
import _ from 'lodash'
import mongoose from 'mongoose'


export const borrowBook = async (req, res) => {
    console.log('accessed transaction API')
  const { error } = transactionSchema.validate(req.body)
  
  if (error) return res.status(400).json({ 
        message: error.details[0].message 
    })

  try {
    const { stud_id, book_id } = req.body

    // Ensure the book exists and is available
    const book = await Book.findById(book_id)
    
    if (!book) return res.status(404).json({ message: "Book not found" })
        
    // Check if the book is already borrowed
    const existingTransaction = await Transaction.findOne({ book_id, status: "borrowed" })
    
    if (existingTransaction) return res.status(400).json({ message: "Book is already borrowed" })

    const transactionData = {
        stud_id,
        book_id,
        status : 'borrowed',
        history: [{ action:'borrowed' }]
    }
        

    // Create and save the transaction
    const transaction = new Transaction(transactionData)
    await transaction.save()
    
    // book status to borrowed
    // const book = await Book.findById(transaction.book_id)
    book.isAvailable = false
    await book.save()

    res.status(201).json({ message: "Book borrowed successfully", transaction })
    
  } catch (error) {
    res.status(500).json({ message: error.message})
  }
}

export const returnBook = async (req, res) => {
  try {
    const { transaction_id } = req.body

    // Validate transaction_id as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
      return res.status(400).json({ error: 'Invalid transaction ID' });
    }

    // Find the transaction
    const transaction = await Transaction.findById(transaction_id)
    if (!transaction) {
      return res.status(400).json({ message: 'Transaction not found' })
    }

    // Check if the book is already returned
    if (transaction.status === 'returned') {
      return res.status(400).json({ error: 'Book already returned' });
    }

    // Update transaction status
    transaction.return_date = new Date()
    transaction.status = 'returned'
    transaction.history.push({ action: 'returned' })

    await transaction.save()

    // Update book status to available
    const book = await Book.findById(transaction.book_id)
    book.isAvailable = true
    await book.save()

    res.status(200).json({ message: 'Book returned successfully', transaction })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getTransaction = async (req, res) => {
  try {
    // Check if no query parameters are provided
    if (_.isEmpty(req.query)) {
      return res.status(400).json({ message: "At least one transaction property must be provided." });
    }

    // Extract query parameters
    const { transaction_id, stud_id, book_id, borrow_date, return_date, status } = req.query;

    let query = {};

    // Validate transaction_id
    if (transaction_id && transaction_id.trim().length === 24) {
      query.transaction_id = transaction_id;
    } else if (transaction_id) {
      return res.status(400).json({ message: 'Transaction ID must be a valid string.' });
    }

    // Validate stud_id
    if (stud_id && stud_id.trim().length === 24) {
      query.stud_id = stud_id;
    } else if (stud_id) {
      return res.status(400).json({ message: 'Student ID must be a valid string.' });
    }

    // Validate book_id
    if (book_id && _.isString(book_id.trim()) && (_.length(book_id.trim() == 24))) {
      query.book_id = book_id;
    } else if (book_id) {
      return res.status(400).json({ message: 'Book ID must be a valid string.' });
    }

    // Validate borrow_date (must be a valid ISO date)
    if (borrow_date && _.isString(borrow_date) && !isNaN(Date.parse(borrow_date))) {
      query.borrow_date = new Date(borrow_date);
    } else if (borrow_date) {
      return res.status(400).json({ message: 'Borrow date must be a valid ISO date.' });
    }

    // Validate return_date (optional, but must be a valid date if provided)
    if (return_date && _.isString(return_date) && !isNaN(Date.parse(return_date))) {
      query.return_date = new Date(return_date);
    } else if (return_date) {
      return res.status(400).json({ message: 'Return date must be a valid ISO date.' });
    }

    // Validate status (must be 'borrowed' or 'returned')
    if (status && _.isString(status) && ['borrowed', 'returned'].includes(status.toLowerCase())) {
      query.status = status.toLowerCase();
    } else if (status) {
      return res.status(400).json({ message: 'Status must be either "borrowed" or "returned".' });
    }

    // If no valid filters were provided
    if (_.isEmpty(query)) {
      return res.status(400).json({ message: "Please provide valid transaction filters such as 'stud_id', 'book_id', 'borrow_date', 'return_date', or 'status'." });
    }

    // Fetch transactions based on query
    const transactions = await Transaction.find(query).populate('stud_id').populate('book_id');

    // If no transactions found
    if (_.isEmpty(transactions)) {
      return res.status(404).json({ message: 'No transactions found matching the criteria' });
    }

    // Return the transactions
    res.status(200).json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while retrieving transactions' });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;

    if (!transaction_id || !_.isString(transaction_id) || (_.length(transaction_id.trim()) != 24)) {
      return res.status(400).json({ message: "Valid transaction ID is required." });
    }

    const updateFields = _.pick(req.body, ["stud_id", "book_id", "borrow_date", "return_date", "status"]);

    // Validate status if provided
    if (updateFields.status && !["borrowed", "returned"].includes(updateFields.status)) {
      return res.status(400).json({ message: "Invalid status. Use 'borrowed' or 'returned'." });
    }else{
      if (updateFields.status === "returned") {
          await Book.findByIdAndUpdate(transaction.book_id, { isAvailable: true });
      } else if (updateFields.status === "borrowed") {
          await Book.findByIdAndUpdate(transaction.book_id, { isAvailable: false });
      }
    }

    const transaction = await Transaction.findByIdAndUpdate(
      transaction_id,
      { $set: updateFields },
      { new: true, runValidators: true } // Returns updated document
    );

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    res.status(200).json({ message: "Transaction updated successfully.", transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred while updating the transaction." });
  }
}

export const getAllTransactions = async (req, res)=>{
    try{
      const transactions = await Transaction.find()
      res.status(200).json(transactions) 
    }catch(err) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteTransaction = async (req, res) =>{
    try {
      const { transaction_id } = req.params;

      // Validate transaction_id as a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(transaction_id)) {
        return res.status(400).json({ error: 'Invalid transaction ID' });
      }

      const deletedTransaction = await Transaction.findByIdAndDelete(transaction_id);
      if (!deletedTransaction) {
        return res.status(404).json({ message: 'Transaction not found' });
      }
      res.status(200).json({ message: 'Transaction deleted successfully', deletedTransaction });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting transaction', error: err.message });
    }
}