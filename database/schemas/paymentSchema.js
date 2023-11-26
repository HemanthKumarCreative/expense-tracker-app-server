const Joi = require("@hapi/joi");

module.exports.createPaymentSchema = Joi.object().keys({
  userId: Joi.string().required(),
  paymentId: Joi.string().required(),
  orderStatus: Joi.string().required(),
});

module.exports.getAllPaymentsSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updatePaymentSchema = Joi.object().keys({
  userId: Joi.string(),
  paymentId: Joi.string(),
  orderStatus: Joi.string(),
});
