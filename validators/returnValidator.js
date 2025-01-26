import Joi from 'joi';

const returnSchemaValidator = Joi.object({
  stud_id: Joi.string()
    .alphanum()   // Alphanumeric characters
    .min(3)
    .max(30)
    .required(),

  stud_name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  stud_class: Joi.string()
    .min(3)
    .max(30)
    .required(),

  book_name: Joi.string()
    .min(5)
    .max(200)
    .required(),

  borrowing_date: Joi.date()
    .iso()         // Ensures the date is in ISO 8601 format
    .required(),

  return_date: Joi.date()
    .iso()         // Ensures the date is in ISO 8601 format
    .required()
    .greater(ref('borrowing_date')) // Ensure return date is later than borrowing date
});

export default returnSchemaValidator;