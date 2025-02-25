import Joi from "joi"
import mongoose from "mongoose";

const transactionSchema = Joi.object().keys({
    stud_id: Joi.string()
      .custom((value, helpers) => {
        return mongoose.Types.ObjectId.isValid(value)
          ? value
          : helpers.message("Invalid Student ID");
      })
      .required(),
    
    book_id: Joi.string()
      .custom((value, helpers) => {
        return mongoose.Types.ObjectId.isValid(value)
          ? value
          : helpers.message("Invalid Book ID");
      })
      .required(),

    borrow_date: Joi.date().iso().default(() => new Date()),

    return_date: Joi.date().iso().allow(null),

    status: Joi.string().valid('borrowed', 'returned').default('borrowed'),

    history: Joi.array().items(
      Joi.object({
        action: Joi.string().valid('borrowed', 'returned').required(),
        date: Joi.date().iso().default(() => new Date()),
      })
    )
});


export default transactionSchema