const mongoose = require('mongoose')

const userLoginSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username must be at least 3 characters long'], // min length validation
        maxlength: [30, 'Username cannot exceed 30 characters'], // max length validation
        unique: false,
      },
      full_name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
      }
})

const loginUser = mongoose.model('loginUser', userLoginSchema)

module.exports = loginUser