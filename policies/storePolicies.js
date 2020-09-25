const Joi = require("joi");
module.exports = {
  validateStoreUpdate: async function(req, res, next) {
    const schema = Joi.object({
      quantity: Joi.number()

        .required()
        .positive()
        .required()
        .messages({
          "any.required": "The quantity field is a required field",
          "number.positive": "The price field can only be positive",
        }),

      status: Joi.string()
        .valid("active", "inactive")
        .required()
        .messages({
          "any.required": "The status field is a required field",
          "string.empty": "The status field cannot be empty",
          "any.valid": "The status field can either be active, or inactive",
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
