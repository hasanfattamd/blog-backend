const joi = require("joi");

const categoryCreateDto = Joi.object({
    name: Joi.string().trim().min(2).max(30).required(),
}).options({
    abortEarly: false,
    stripUnknown: true,
});

module.exports = categoryCreateDto;






