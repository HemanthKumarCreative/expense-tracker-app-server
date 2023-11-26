const Joi = require("@hapi/joi");

module.exports.createExpenseSchema = Joi.object().keys({
  userId: Joi.string().required(),
  amount: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
});

module.exports.getAllExpensesSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateExpenseSchema = Joi.object().keys({
  userId: Joi.string(),
  amount: Joi.number(),
  description: Joi.string(),
  category: Joi.string(),
});
