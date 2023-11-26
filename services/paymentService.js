const Payment = require("../database/models/paymentModel");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelper");
const constants = require("../constants/index");

module.exports.createPayment = async (serviceData) => {
  try {
    let payment = new Payment({ ...serviceData });
    let result = await payment.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createPayment", error);
    throw new Error(error);
  }
};

module.exports.getAllPayments = async ({ skip = 0, limit = 10 }) => {
  try {
    let payments = await Payment.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return formatMongoData(payments);
  } catch (error) {
    console.log("Something went wrong: Service: getAllPayments", error);
    throw new Error(error);
  }
};

module.exports.getPaymentById = async ({ id }) => {
  try {
    checkObjectId(id);
    let payment = await Payment.findById(id);
    if (!payment) {
      throw new Error(constants.paymentMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(payment);
  } catch (error) {
    console.log("Something went wrong: Service: getPaymentById", error);
    throw new Error(error);
  }
};

module.exports.updatePayment = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let payment = await Payment.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!payment) {
      throw new Error(constants.paymentMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(payment);
  } catch (error) {
    console.log("Something went wrong: Service: updatePayment", error);
    throw new Error(error);
  }
};

module.exports.deletePayment = async ({ id }) => {
  try {
    checkObjectId(id);
    let payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      throw new Error(constants.paymentMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(payment);
  } catch (error) {
    console.log("Something went wrong: Service: deletePayment", error);
    throw new Error(error);
  }
};
