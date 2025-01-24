import { object, string, date, ref } from 'joi';

const returnSchemaValidator = object({
  stud_id: string()
    .alphanum()   // Alphanumeric characters
    .min(3)
    .max(30)
    .required(),

  stud_name: string()
    .min(3)
    .max(100)
    .required(),

  stud_class: string()
    .min(3)
    .max(30)
    .required(),

  book_name: string()
    .min(5)
    .max(200)
    .required(),

  borrowing_date: date()
    .iso()         // Ensures the date is in ISO 8601 format
    .required(),

  return_date: date()
    .iso()         // Ensures the date is in ISO 8601 format
    .required()
    .greater(ref('borrowing_date')) // Ensure return date is later than borrowing date
});

export default returnSchemaValidator;