import mongoose from 'mongoose'

const userSignupSchema = new mongoose.Schema({
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
      },
      password: {
        type: String,
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'], // min length validation for password
        maxlength: [128, 'Password cannot exceed 128 characters'], // max length validation for password
      },
      email: {
        type: String,
        required: true,
        unique: true,  // Ensure that the email is unique
        lowercase: true,  // Convert email to lowercase
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']  // Validate email format
      },
      role: {
        type: String,
        enum: ['STUDENT', 'LIBRARIAN', 'ADMIN', 'USER'],  // Define possible roles for the user
        default: 'USER',  // Default role is 'user'
        required: true
      },
      user_profile_image: {
        type: String,  // This will store the URL or path to the image
        required: false,  // Profile image is optional
        default: ''  // Default is an empty string if no image is provided
      }
}, {
  timestamps: true
})

const signupUser = mongoose.model('signupUser', userSignupSchema)

export default signupUser;