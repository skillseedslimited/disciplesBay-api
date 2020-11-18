const Joi = require("joi");
module.exports = {
  validatePartnershipCreation: async function(req, res, next) {
    var schema = Joi.object({
      name: Joi.string()
        .min(2)
        .required()
        .messages({
          "any.required": "The name field is a required field",
          "string.empty": "Name  cannot be empty",
          "string.min": `Name cannot be less than {#limit}`,
        }),
        start_amount: Joi.number().positive()
        .required()
        .messages({
          "any.required": "The start_amount field is a required field",
          "number.positive": "The start_amount must be a positive value",
        }),
        end_amount: Joi.number().positive()
        .required()
        .messages({
          "any.required": "The end_amount field is a required field",
          "number.positive": "The end_amount must be a positive value",
        }),
        frequency: Joi.string() .required().valid('monthly', 'quarterly','yearly').messages({
          "any.required": "The frequency field is a required field",
          "any.valid": "The frequency must be between a range of values",
        }),
    });

    try {
      const value = await schema.validateAsync(req.body);
      next();
    } catch (err) {
      err.details[0].type = err.details[0].context.key;
      res.status(422).json({ success: false, message: err.details[0] });
    }
  },
};
