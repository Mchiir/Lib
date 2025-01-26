import Joi from "joi"

const loginUserSchema = Joi.object().keys({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .min(8)
    .max(128)
    .required()
});

export default loginUserSchema