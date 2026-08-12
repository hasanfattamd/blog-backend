const Joi = require('joi');

const createPostDto = Joi.object({
    title:Joi.string().trim().min(3).max(180).required(),
    content:Joi.string().trim().min(20).required(),
    category:Joi.string().hex().length(24).required()
}).options({
    abortEarly : false,
    stripUnknown: true
})

module.exports = createPostDto