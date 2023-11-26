const Joi = require("@hapi/joi");

module.exports.createOrderSchema = Joi.object().keys({
  userId: Joi.string().required(),
  paymentId: Joi.string().required(),
  orderStatus: Joi.string().required(),
});

module.exports.getAllOrdersSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateOrderSchema = Joi.object().keys({
  userId: Joi.string(),
  paymentId: Joi.string(),
  orderStatus: Joi.string(),
});
