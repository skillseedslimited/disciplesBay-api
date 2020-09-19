const Joi = require("joi");
module.exports = {
  validateSermonCategory: async function(req, res, next) {
    var schema = Joi.object({
      name: Joi.string()
        .min(2)
        .required()
        .messages({
          "any.required": "The name field is a required field",
          "string.empty": "Sermon category name cannot be empty",
          "string.min": `Sermon category name cannot be less than {#limit}`,
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

  validateSermon: async function(req, res, next) {
    var schema = Joi.object({
      title: Joi.string()
        .min(2)
        .required()
        .messages({
          "any.required": "The title field is a required field",
          "string.empty": "The title field cannot be empty",
          "string.min": `The title field cannot be less than {#limit}`,
        }),
      author: Joi.string()
        .min(2)
        .required()
        .messages({
          "any.required": "The author field is a required field",
          "string.empty": "The author field cannot be empty",
          "string.min": `The author field cannot be less than {#limit}`,
        }),
      description: Joi.string()
        .min(2)
        .required()
        .messages({
          "any.required": "The description field is a required field",
          "string.empty": "The description field cannot be empty",
          "string.min": `The description field cannot be less than {#limit}`,
        }),
      category: Joi.string()

        .required()
        .messages({
          "any.required": "The category field is a required field",
          "string.empty": "The category field cannot be empty",
        }),
      content_type: Joi.string()
        .valid("audio", "video", "ebook")
        .required()
        .messages({
          "any.required": "The content_type field is a required field",
          "string.empty": "The content_type field cannot be empty",
          "any.valid":
            "The content_type field can either be audio, video and ebook",
        }),
      status: Joi.string()
        .valid("save", "publish")
        .required()
        .messages({
          "any.required": "The status field is a required field",
          "string.empty": "The status field cannot be empty",
          "any.valid": "The status field can either be save, publish",
        }),
      subscription_type: Joi.string()
        .valid("free", "paid", "subscription")
        .required()
        .messages({
          "any.required": "The subscription_type field is a required field",
          "string.empty": "The subscription_type field cannot be empty",
          "any.valid":
            "The subscription_type field can either be free, paid and subscription",
        }),
      cover_image: Joi.string()

        .required()
        .messages({
          "any.required": "The cover_image field is a required field",
          "string.empty": "The cover_image field cannot be empty",
        }),
      price: Joi.number()
        .positive()
        .required()
        .messages({
          "any.required": "The price field is a required field",
          "number.positive": "Te price field can only be positive",
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
