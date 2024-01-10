const expenseService = require("../services/expenseService");
const constants = require("../constants");

module.exports.createExpense = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await expenseService.createExpense(req.body);
    response.status = 201;
    response.message = constants.expenseMessage.PRODUCT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createExpense", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getAllExpenses = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await expenseService.getAllExpenses(
      req.params.userId
    );
    response.status = 200;
    response.message = constants.expenseMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllExpenses", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getExpenseById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await expenseService.getExpenseById(req.params);
    response.status = 200;
    response.message = constants.expenseMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getExpenseById", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.updateExpense = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await expenseService.updateExpense({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.expenseMessage.PRODUCT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateExpense", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.deleteExpense = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await expenseService.deleteExpense(req.params);
    response.status = 200;
    response.message = constants.expenseMessage.PRODUCT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteExpense", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};
