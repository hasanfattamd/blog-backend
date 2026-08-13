const Joi = require("joi");

const createCategoryDto = Joi.object({
    name: Joi.string().trim().min(2).max(30).required(),
}).options({
    abortEarly: false,
    stripUnknown: true,
});

module.exports = createCategoryDto;






