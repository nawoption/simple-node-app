const Joi = require("joi");

const idSchema = Joi.object({
    id: Joi.string().hex().length(24).required(), // MongoDB ObjectId validation
});

module.exports = idSchema;
