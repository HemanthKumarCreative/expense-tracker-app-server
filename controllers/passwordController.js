const passwordService = require("../services/passwordService");
const constants = require("../constants");

module.exports.createPassword = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await passwordService.createPassword(req.body);
    response.status = 200;
    response.message = constants.passwordMessage.PRODUCT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createPassword", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getAllPasswords = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await passwordService.getAllPasswords(
      req.query
    );
    response.status = 200;
    response.message = constants.passwordMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllPasswords", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getPasswordById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await passwordService.getPasswordById(
      req.params
    );
    response.status = 200;
    response.message = constants.passwordMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getPasswordById", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.updatePassword = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await passwordService.updatePassword({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.passwordMessage.PRODUCT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updatePassword", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.deletePassword = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await passwordService.deletePassword(
      req.params
    );
    response.status = 200;
    response.message = constants.passwordMessage.PRODUCT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deletePassword", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};
