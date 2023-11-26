const Joi = require("@hapi/joi");

module.exports.createDownloadSchema = Joi.object().keys({
  userId: Joi.string().required(),
  fileLink: Joi.string().required(),
});

module.exports.getAllDownloadsSchema = Joi.object().keys({
  skip: Joi.string(),
  limit: Joi.string(),
});

module.exports.updateDownloadSchema = Joi.object().keys({
  userId: Joi.string(),
  fileLink: Joi.string(),
});
