const Joi = require("joi");

const trainingSchema = Joi.object({
    level: Joi.string()
        .valid("L1", "L2", "L3")
        .default("L1")
        .messages({
            "any.only": "Le niveau doit être l'une des valeurs suivantes : L1, L2, L3.",
            "string.base": "Le niveau doit être une chaîne de caractères.",
        }),

    price: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "Le prix doit être un nombre.",
            "number.integer": "Le prix doit être un entier.",
            "number.positive": "Le prix doit être un nombre positif.",
            "any.required": "Le prix est requis.",
        }),

    duration: Joi.number()
        .integer()
        .positive()
        .required()
        .messages({
            "number.base": "La durée doit être un nombre.",
            "number.integer": "La durée doit être un entier.",
            "number.positive": "La durée doit être un nombre positif.",
            "any.required": "La durée est requise.",
        }),

    id: Joi.string().uuid().optional().messages({
        "string.guid": "L'identifiant doit être un UUID valide.",
        "string.base": "L'identifiant doit être une chaîne de caractères.",
    }),

    createdAt: Joi.date().optional().messages({
        "date.base": "La date de création doit être une date valide.",
    }),

    updatedAt: Joi.date().optional().messages({
        "date.base": "La date de mise à jour doit être une date valide.",
    }),
});

module.exports = trainingSchema;
