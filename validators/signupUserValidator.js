import Joi from 'joi'


const signupUserSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),

  full_name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(128)
    .required(),

  role: Joi.string()
    .valid('STUDENT', 'LIBRARIAN', 'ADMIN', 'USER')
    .default('user')
    .required(),

  user_profile_image: Joi.string()
    .uri()  // Validate if the user profile image is a valid URL
    .optional()
})

export default signupUserSchema