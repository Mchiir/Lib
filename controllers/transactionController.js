import Transaction from '../models/transaction.js'
import { Book } from '../models/book.js'
import transactionSchema from '../validators/transactionValidator.js'


export const borrowBook = async (req, res) => {
    console.log('accessed transaction API')
  const { error } = transactionSchema.validate(req.body)
  
  if (error) return res.status(400).json({ 
        message: error.details[0].message 
    })

  try {
    const { stud_id, book_id, borrow_date, return_date, status, history } = req.body

    // Ensure the book exists and is available
    const book = await Book.findById(book_id)
    
    if (!book) return res.status(404).json({ message: "Book not found" })
        
    // Check if the book is already borrowed
    const existingTransaction = await Transaction.findOne({ book_id, status: "borrowed" })
    
    if (existingTransaction) return res.status(400).json({ message: "Book is already borrowed" })

    const transactionData = {
        stud_id,
        book_id,
        borrow_date: borrow_date || new Date(),
        return_date: return_date || null,
        status : status || 'borrowed',
        history: history || [
            { action:"borrowed", date: new Date() }
        ]
    }
        

    // Create and save the transaction
    const transaction = new Transaction(transactionData)
    await transaction.save()
    

    res.status(201).json({ message: "Book borrowed successfully", transaction_status: `${transaction.status}` })
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error })
  }
}
