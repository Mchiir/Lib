const Joi = require('joi')

const userSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .min(8)
    .max(128)
    .required()
})

module.exports = userSchema