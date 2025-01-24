import { object, string } from 'joi'

const signupUserSchema = object({
  username: string()
    .min(3)
    .max(30)
    .required(),

  full_name: string()
    .min(3)
    .max(100)
    .required(),

  email: string()
    .email()
    .required(),

  password: string()
    .min(8)
    .max(128)
    .required(),

  role: string()
    .valid('STUDENT', 'LIBRARIAN', 'ADMIN', 'USER')
    .default('user')
    .required(),

  user_profile_image: string()
    .uri()  // Validate if the user profile image is a valid URL
    .optional()
})

export default signupUserSchema