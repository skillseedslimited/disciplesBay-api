const Joi = require("joi");
module.exports = {
  validateRole: async function(req, res, next) {
    const schema = Joi.object({
      name: Joi.string()
        .min(2)
        .required()
        .messages({
          "any.required": "The name field is a required field",
          "string.empty": "Role name cannot be empty",
          "string.min": `Role name cannot be less than {#limit}`,
        }),

      permissions: Joi.array()
        .items(Joi.string())
        .min(1)
        .required()
        .messages({
          "any.required": "Permission field is required",
          "array.min": "A permission must be assigned to this role",
        }),

      menu_structure: Joi.array().optional(),
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
