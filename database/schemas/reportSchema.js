const Joi = require("@hapi/joi");

module.exports.createReportSchema = Joi.object().keys({
  userId: Joi.string().required(),
  amount: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  fileLink: Joi.string().required(),
});

module.exports.getAllReportsSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateReportSchema = Joi.object().keys({
  userId: Joi.string(),
  amount: Joi.number(),
  description: Joi.string(),
  category: Joi.string(),
  fileLink: Joi.string(),
});
