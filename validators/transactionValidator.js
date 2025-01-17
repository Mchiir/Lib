const Joi = require('joi');

const transactionSchemaValidator = Joi.object({
  stud_id: Joi.string()
    .alphanum()
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
    .iso()
    .when('status', { is: 'borrowed', then: Joi.required() }),

  return_date: Joi.date()
    .iso()
    .when('status', { is: 'returned', then: Joi.required() }),

  status: Joi.string()
    .valid('borrowed', 'returned')
    .required()
});

module.exports = transactionSchemaValidator;