const bcrypt = require('bcryptjs')
const User = require('../models/User')
const userSchema = require('../validators/userValidator')

exports.createUser = async (req, res) =>{
    try{
        const { error, value } = userSchema.validate(req.body)
        
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        
        const { username, password } =  value

        // Hash the password before saving it
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
        username,
        password: hashedPassword
        })

        const savedUser = await newUser.save()
        res.status(201).json({
            message: 'User created successfully',
            username: savedUser.username
        })
    } catch (err) {
        // Error handling: Check if it's a validation error from Mongoose
        if (err.name === 'ValidationError') {
          // Validation error (e.g., required fields, max/min length)
          return res.status(400).json({ message: err.message })
        }
    
        // Handle other errors (e.g., database issues, server errors)
        console.error(err)
        res.status(500).json({
          message: 'An error occurred while creating the user',
          error: err.message
        })
    }
}

exports.login = async (req, res) => {}
