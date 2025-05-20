const Joi = require("joi");

const messageSchema = Joi.object({
    _csrf: Joi.string().optional(),

    id: Joi.string()
        .uuid()
        .optional()
        .messages({
            "string.uuid": "L'identifiant doit être un UUID valide.",
        }),

    fullname: Joi.string()
        .min(1)
        .max(255)
        .required()
        .messages({
            "string.base": "Le nom complet doit être une chaîne de caractères.",
            "string.empty": "Le nom complet est requis.",
            "string.min": "Le nom complet doit contenir au moins 1 caractère.",
            "string.max": "Le nom complet ne peut pas dépasser 255 caractères.",
            "any.required": "Le nom complet est obligatoire.",
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.base": "L'adresse e-mail doit être une chaîne de caractères.",
            "string.email": "L'adresse e-mail doit être valide.",
            "any.required": "L'adresse e-mail est obligatoire.",
            "string.empty": "L'adresse e-mail est requise.",
        }),

    subject: Joi.string()
        .min(1)
        .max(255)
        .required()
        .messages({
            "string.base": "Le sujet doit être une chaîne de caractères.",
            "string.empty": "Le sujet est requis.",
            "string.min": "Le sujet doit contenir au moins 1 caractère.",
            "string.max": "Le sujet ne peut pas dépasser 255 caractères.",
            "any.required": "Le sujet est obligatoire.",
        }),

    message: Joi.string()
        .required()
        .messages({
            "string.base": "Le message doit être une chaîne de caractères.",
            "string.empty": "Le message est requis.",
            "any.required": "Le message est obligatoire.",
        }),
});

module.exports = messageSchema;

