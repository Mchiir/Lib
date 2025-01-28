import Joi from "joi"

const studentSchema = Joi.object().keys({
  stud_id: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': 'Student ID must be a string.',
      'string.min': 'Student ID must be at least 3 characters long.',
      'string.max': 'Student ID must be at most 30 characters long.',
      'any.required': 'Student ID is required.'
    }),

  stud_name: Joi.string()
    .pattern(/^[a-zA-Z\s]+$/)  // Allow only letters and spaces
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Student name must be a string.',
      'string.min': 'Student name must be at least 3 characters long.',
      'string.max': 'Student name must be at most 100 characters long.',
      'any.required': 'Student name is required.',
      'string.pattern.base': 'Student name must only contain letters and spaces.'  // Custom message for invalid characters
    }),

  stud_class: Joi.string()
    .pattern(/^S[1-6][A-D]$/i)  // Regex to match the pattern "S1A", "S2B", ..., "S6D", case-insensitive
    .required()
    .messages({
      'string.base': 'Student class must be a string.',
      'string.empty': 'Student class cannot be empty.',
      'string.pattern.base': `Student class must be in the format "S1A", "S2B", ..., "S6D".`,
      'any.required': 'Student class is required.'
    }).custom((value, helper) => {
      // Convert the value to uppercase after validation
      return value.toUpperCase();
    })
});

export default studentSchema