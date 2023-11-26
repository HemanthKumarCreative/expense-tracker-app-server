const Joi = require("@hapi/joi");

module.exports.createPasswordSchema = Joi.object().keys({
  userId: Joi.string().required(),
  resetToken: Joi.string().required(),
});

module.exports.getAllPasswordsSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updatePasswordSchema = Joi.object().keys({
  userId: Joi.string(),
  resetToken: Joi.string(),
});
