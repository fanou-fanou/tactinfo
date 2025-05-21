const Joi = require("joi");

const moduleSchema = Joi.object({
    name: Joi.string()
        .required()
        .messages({
            "string.base": "Le nom doit être une chaîne de caractères.",
            "string.empty": "Le nom est requis.",
            "any.required": "Le nom est requis.",
        }),

    duration: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "La durée doit être un nombre.",
            "number.integer": "La durée doit être un entier.",
            "number.positive": "La durée doit être positive.",
            "any.required": "La durée est requise.",
        }),

    price: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": "Le prix doit être un nombre.",
            "number.integer": "Le prix doit être un entier.",
            "number.min": "Le prix ne peut pas être négatif.",
            "any.required": "Le prix est requis.",
        }),

    id: Joi.string()
        .uuid()
        .optional()
        .messages({
            "string.guid": "L'identifiant doit être un UUID valide.",
        }),

    createdAt: Joi.date()
        .optional()
        .messages({
            "date.base": "La date de création doit être une date valide.",
        }),

    updatedAt: Joi.date()
        .optional()
        .messages({
            "date.base": "La date de mise à jour doit être une date valide.",
        }),
});

module.exports = moduleSchema;