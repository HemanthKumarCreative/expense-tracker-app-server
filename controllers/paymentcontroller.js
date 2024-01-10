const paymentService = require("../services/paymentService");
const constants = require("../constants");

module.exports.createPayment = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await paymentService.createPayment(req.body);
    response.status = 200;
    response.message = constants.paymentMessage.PRODUCT_CREATED;
    response.body = responseFromService.order;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getAllPayments = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await paymentService.getAllPayments(req.query);
    response.status = 200;
    response.message = constants.paymentMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getPaymentById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await paymentService.getPaymentById(req.params);
    response.status = 200;
    response.message = constants.paymentMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.updatePayment = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await paymentService.updatePayment({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.paymentMessage.PRODUCT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.deletePayment = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await paymentService.deletePayment(req.params);
    response.status = 200;
    response.message = constants.paymentMessage.PRODUCT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};
