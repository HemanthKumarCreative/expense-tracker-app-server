const reportService = require("../services/reportService");
const constants = require("../constants");

module.exports.createReport = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await reportService.createReport(
      req.params.userId
    );
    response.status = 200;
    response.message = constants.reportMessage.PRODUCT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createReport", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getAllReports = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await reportService.getAllReports(req.query);
    response.status = 200;
    response.message = constants.reportMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllReports", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getReportById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await reportService.getReportById(req.params);
    response.status = 200;
    response.message = constants.reportMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getReportById", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.updateReport = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await reportService.updateReport({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.reportMessage.PRODUCT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateReport", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.deleteReport = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await reportService.deleteReport(req.params);
    response.status = 200;
    response.message = constants.reportMessage.PRODUCT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteReport", error);
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};
