const Order = require("../database/models/orderModel");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelper");
const constants = require("../constants/index");
const Razorpay = require("razorpay");

module.exports.createOrder = async (serviceData) => {
  try {
    let order = new Order({ ...serviceData });
    let result = await order.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createExpense", error);
    throw new Error(error);
  }
};

module.exports.collectPayment = async () => {
  const razorpay = new Razorpay({
    key_id: process.env.RZP_KEY_ID,
    key_secret: process.env.RZP_KEY_SECRET,
  });

  const options = {
    amount: 50000,
    currency: "INR",
    receipt: "receipt-001",
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    const order = {
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    };

    return order;
  } catch (err) {
    console.error(err);
  }
};

module.exports.getAllOrders = async ({ skip = 0, limit = 10 }) => {
  try {
    let orders = await Order.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return formatMongoData(orders);
  } catch (error) {
    console.log("Something went wrong: Service: getAllOrders", error);
    throw new Error(error);
  }
};

module.exports.getOrderById = async ({ id }) => {
  try {
    checkObjectId(id);
    let order = await Order.findById(id);
    if (!order) {
      throw new Error(constants.orderMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(order);
  } catch (error) {
    console.log("Something went wrong: Service: getOrderById", error);
    throw new Error(error);
  }
};

module.exports.updateOrder = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let order = await Order.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!order) {
      throw new Error(constants.orderMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(order);
  } catch (error) {
    console.log("Something went wrong: Service: updateOrder", error);
    throw new Error(error);
  }
};

module.exports.deleteOrder = async ({ id }) => {
  try {
    checkObjectId(id);
    let order = await Order.findByIdAndDelete(id);
    if (!order) {
      throw new Error(constants.orderMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(order);
  } catch (error) {
    console.log("Something went wrong: Service: deleteOrder", error);
    throw new Error(error);
  }
};
