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
    .alphanum()
    .min(3)
    .max(100)
    .required()
    .messages({
      'string.base': 'Student name must be a string.',
      'string.min': 'Student name must be at least 3 characters long.',
      'string.max': 'Student name must be at most 100 characters long.',
      'any.required': 'Student name is required.'
    }),

  stud_class: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': 'Student class must be a string.',
      'string.min': 'Student class must be at least 3 characters long.',
      'string.max': 'Student class must be at most 30 characters long.',
      'any.required': 'Student class is required.'
    })
});

export default studentSchema