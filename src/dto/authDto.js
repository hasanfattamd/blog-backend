const Joi = require("joi");

const userSignupSchema = Joi.object({
    name: Joi.string().trim().min(2).max(20).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string()
        .min(6)
        .message("Password must contains 6 chars minimum")
        .required(),
}).options({
    abortEarly: false,
    stripUnknown: true,
});

const userLoginSchema = Joi.object(
    {
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().required(),
    },
    {
        abortEarly: false,
        stripUnknown: true,
    },
);

module.exports = { userSignupSchema, userLoginSchema };
