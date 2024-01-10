const orderService = require("../services/orderService");
const constants = require("../constants");

module.exports.createOrder = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await orderService.createOrder(req.body);
    response.status = 200;
    response.message = constants.orderMessage.PRODUCT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.collectPayment = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await orderService.collectPayment();
    response.status = 200;
    response.message = constants.orderMessage.PRODUCT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getAllOrders = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await orderService.getAllOrders(req.query);
    response.status = 200;
    response.message = constants.orderMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getOrderById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await orderService.getOrderById(req.params);
    response.status = 200;
    response.message = constants.orderMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.updateOrder = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await orderService.updateOrder({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.orderMessage.PRODUCT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.deleteOrder = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await orderService.deleteOrder(req.params);
    response.status = 200;
    response.message = constants.orderMessage.PRODUCT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};
