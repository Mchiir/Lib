const Joi = require('joi')

const studentSchema = Joi.object({
  stud_id: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    stud_name: Joi.string()
    .alphanum()
    .min(3)
    .max(100)
    .required(),

    stud_class: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
})

module.exports = studentSchema