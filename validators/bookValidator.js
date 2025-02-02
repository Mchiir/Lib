import Joi from "joi";
import { Lessons } from "../models/lessonEnum.js";

// Define book validation schema with title, category, and level
const bookValidatorSchema = Joi.object({
     // book_no validation
     book_no: Joi.number()
     .positive()
     .max(9999999999) // Maximum of 10 digits
     .required()
     .messages({
         "number.base": "Book number must be a number.",
         "number.positive": "Book number must be a positive integer.",
         "number.max": "Book number must not exceed 10 digits.",
         "any.required": "Book number is required."
     }),
    
    /* title: Joi.string()
        .min(3)
        .max(200)
        .required()
        .messages({
            "string.base": "Title must be a string.",
            "string.min": "Title must be at least 3 characters long.",
            "string.max": "Title must be at most 200 characters long.",
            "any.required": "Title is required."
        }), */

    // publisher validation
    publisher: Joi.string()
        .min(3)
        .max(100)
        .pattern(/^[a-zA-Z0-9\s]+$/) // Alphanumeric and spaces
        .required()
        .messages({
            "string.base": "Publisher must be a string.",
            "string.min": "Publisher must be at least 3 characters long.",
            "string.max": "Publisher must be at most 100 characters long.",
            "string.pattern.base": "Publisher must be alphanumeric (spaces allowed).",
            "any.required": "Publisher is required."
    }),

    category: Joi.string()
        .valid(
            Lessons.PHYSICS,
            Lessons.MATHEMATICS,
            Lessons.CHEMISTRY,
            Lessons.BIOLOGY,
            Lessons.HISTORY,
            Lessons.LITERATURE,
            Lessons.GEOGRAPHY,
            Lessons.ENGLISH,
            Lessons.IKINYARWANDA,
            Lessons.ENTREPRENEURSHIP,
            Lessons.ICT
        )
        .required()
        .messages({
            "any.only": `Category must be one of the following values: ${Object.values(Lessons).join(", ")}.`,
            "any.required": "Category is required."
        }),

    level: Joi.string()
        .pattern(/^S[1-6]$/i) // Matches "Senior 1", "Senior2", etc.
        .required()
        .messages({
            "string.pattern.base": `Student class must be in the format "S1", "S2", ..., "S6".`,
            "any.required": "Level is required."
        }).custom((value, helper) => {
            // Convert the value to uppercase after validation
            return value.toUpperCase();
        }),

    // Optional isAvailable field
    isAvailable: Joi.boolean()
                .optional()
})

export default bookValidatorSchema