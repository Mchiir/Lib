const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username must be at least 3 characters long'], // min length validation
        maxlength: [30, 'Username cannot exceed 30 characters'], // max length validation
        unique: false,
      },
      password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'], // min length validation for password
        maxlength: [128, 'Password cannot exceed 128 characters'], // max length validation for password
      },
})

const User = mongoose.model('User', userSchema)

module.exports = User