const Joi = require("joi");

const messageSchema = Joi.object({
    _csrf: Joi.string().optional(),
    id: Joi.string().uuid().optional(),
    fullname: Joi.string().min(1).max(255).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(1).max(255).required(),
    message: Joi.string().required(),

});

module.exports = messageSchema;