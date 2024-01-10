const downloadService = require("../services/downloadService");
const constants = require("../constants");

module.exports.createDownload = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await downloadService.createDownload(req.body);
    response.status = 200;
    response.message = constants.downloadMessage.PRODUCT_CREATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getAllDownloads = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await downloadService.getAllDownloads(
      req.params.userId
    );
    response.status = 200;
    response.message = constants.downloadMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.getDownloadById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await downloadService.getDownloadById(
      req.params
    );
    response.status = 200;
    response.message = constants.downloadMessage.PRODUCT_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.updateDownload = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await downloadService.updateDownload({
      id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.downloadMessage.PRODUCT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};

module.exports.deleteDownload = async (req, res) => {
  let response = { ...constants.defaultServerResponse };

  try {
    const responseFromService = await downloadService.deleteDownload(
      req.params
    );
    response.status = 200;
    response.message = constants.downloadMessage.PRODUCT_DELETED;
    response.body = responseFromService;
  } catch (error) {
    response.message = error.message;
  }

  return res.status(response.status).send(response);
};
