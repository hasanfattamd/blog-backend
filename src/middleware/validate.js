const validate = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error) {
            const errorMessage = error.details.map((detail) => detail.message);
            return res.status(400).json({
                success: false,
                errors: errorMessage,
            });
        }
        req.body = value; // a clean, sanitized data
        next();
    };
};

module.exports = validate;
