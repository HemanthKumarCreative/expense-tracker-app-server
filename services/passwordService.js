const Password = require("../database/models/passwordModel");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelper");
const constants = require("../constants/index");

module.exports.createPassword = async (serviceData) => {
  try {
    let password = new Password({ ...serviceData });
    let result = await password.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createPassword", error);
    throw new Error(error);
  }
};

module.exports.getAllPasswords = async ({ skip = 0, limit = 10 }) => {
  try {
    let passwords = await Password.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return formatMongoData(passwords);
  } catch (error) {
    console.log("Something went wrong: Service: getAllPasswords", error);
    throw new Error(error);
  }
};

module.exports.getPasswordById = async ({ id }) => {
  try {
    checkObjectId(id);
    let password = await Password.findById(id);
    if (!password) {
      throw new Error(constants.passwordMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(password);
  } catch (error) {
    console.log("Something went wrong: Service: getPasswordById", error);
    throw new Error(error);
  }
};

module.exports.updatePassword = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let password = await Password.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!password) {
      throw new Error(constants.passwordMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(password);
  } catch (error) {
    console.log("Something went wrong: Service: updatePassword", error);
    throw new Error(error);
  }
};

module.exports.deletePassword = async ({ id }) => {
  try {
    checkObjectId(id);
    let password = await Password.findByIdAndDelete(id);
    if (!password) {
      throw new Error(constants.passwordMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(password);
  } catch (error) {
    console.log("Something went wrong: Service: deletePassword", error);
    throw new Error(error);
  }
};
