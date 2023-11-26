const Joi = require("@hapi/joi");

module.exports.createUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  resetToken: Joi.string().required(),
  totalExpenses: Joi.number().required(),
  isPremiumUser: Joi.boolean().required(),
  isSignedIn: Joi.boolean().required(),
});

module.exports.getAllUsersSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateUserSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  resetToken: Joi.string(),
  totalExpenses: Joi.number(),
  isPremiumUser: Joi.boolean(),
  isSignedIn: Joi.boolean(),
});
