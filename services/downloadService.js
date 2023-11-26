const Download = require("../database/models/downloadModel");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelper");
const constants = require("../constants/index");

module.exports.createDownload = async (serviceData) => {
  try {
    let download = new Download({ ...serviceData });
    let result = await download.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createDownload", error);
    throw new Error(error);
  }
};

module.exports.getAllDownloads = async ({ skip = 0, limit = 10 }, userId) => {
  try {
    let downloads = await Download.find({ userId })
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return formatMongoData(downloads);
  } catch (error) {
    console.log("Something went wrong: Service: getAllDownloads", error);
    throw new Error(error);
  }
};

module.exports.getDownloadById = async ({ id }) => {
  try {
    checkObjectId(id);
    let download = await Download.findById(id);
    if (!download) {
      throw new Error(constants.downloadMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(download);
  } catch (error) {
    console.log("Something went wrong: Service: getDownloadById", error);
    throw new Error(error);
  }
};

module.exports.updateDownload = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let download = await Download.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!download) {
      throw new Error(constants.downloadMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(download);
  } catch (error) {
    console.log("Something went wrong: Service: updateDownload", error);
    throw new Error(error);
  }
};

module.exports.deleteDownload = async ({ id }) => {
  try {
    checkObjectId(id);
    let download = await Download.findByIdAndDelete(id);
    if (!download) {
      throw new Error(constants.downloadMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(download);
  } catch (error) {
    console.log("Something went wrong: Service: deleteDownload", error);
    throw new Error(error);
  }
};
