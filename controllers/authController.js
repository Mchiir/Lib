import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import signupUser from '../models/signupUser.js'
import signupUserSchema from '../validators/signupUserValidator.js'

import loginUser from '../models/loginUser.js'
import loginUserSchema from '../validators/loginUserValidator.js'

export const createUser = async (req, res) => {
  try {
    const { error, value } = signupUserSchema.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, full_name, password, email, role, user_profile_image } = value

    // Check if a user with the provided username or email already exists
    const existingUser = await signupUser.findOne({
      $or: [{ username }, { email }] // Check if either username or email already exists
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new signupUser({
      username,
      full_name,
      password: hashedPassword,
      email,
      role,
      user_profile_image
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

export const login = async (req, res) => {

  try {
    const { error, value } = loginUserSchema.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = value

    const user = await signupUser.findOne({ username }); // username must be unique

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role, email: user.email },
      process.env.JWT_SECRET_KEY, // Secret key for signing
      { expiresIn: process.env.JWT_EXPIRATION || '1h' } // Token expiration time (1 hour in this case)
    );

    const newLoggedInUser = new loginUser({
      username,
      password: user.password // log encrypted password
    })

    await newLoggedInUser.save()
    // Send response with token
    res.status(200).json({
      message: 'Login successful',
      token: token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const { error, value } = signupUserSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Get the username from the authenticated user
    const username = req.user.username;

    // Check if user exists by username
    const user = await signupUser.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If password is provided, hash it before saving
    if (value.password) {
      const salt = await bcrypt.genSalt(10);
      value.password = await bcrypt.hash(value.password, salt);
    }

    // Update the user with the new values
    // We are using the user's _id to update the user
    const updatedUser = await signupUser.findByIdAndUpdate(user._id, value, { new: true });

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser.username
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
}

export const deleteUser = async (req, res) => {
  try {
    // console.log(req.user);
    const userId = req.user.userId
    const userRole = req.user.role
    if(userRole != "ADMIN"){
      res.status(401).json({ message:"You're not eligible for this role." })
    }

    const user = await signupUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user
    await signupUser.findByIdAndDelete(userId);
    await loginUser.findOneAndDelete({username: user.username})

    res.status(200).json({
      message: 'User deleted successfully'
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting user', error: err.message });
  }
}

export const getUser = async (req, res) => {
  try {
    const { username } = req.user; // as passed down from jwt middleware

    // Find user by username in the database
    const user = await signupUser.findOne({ username });

    // If user is not found
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user details
    res.status(200).json({
      message: 'User found successfully',
      user
    });
  } catch (err) {
    // Error handling
    console.error(err);
    res.status(500).json({
      message: 'An error occurred while fetching the user',
      error: err.message
    });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    // console.log(req.user)
    // Find all users in the database
    const users = await signupUser.find();


    // checking for eligibility of accessing data.
    if(req.user.role != "ADMIN"){
      return res.status(401).json({ message: `Sorry!, you're not eligible to get these data.` });
    }
    // If no users are found
    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    // Return the list of users
    res.status(200).json({
      message: 'Users retrieved successfully',
      users
    });
  } catch (err) {
    // Error handling
    console.error(err);
    res.status(500).json({
      message: 'An error occurred while fetching users',
      error: err.message
    });
  }
}
