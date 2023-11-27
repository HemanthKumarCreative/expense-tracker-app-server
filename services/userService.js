const User = require("../database/models/userModel");
const constants = require("../constants/index");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async ({ name, email, password }) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      throw new Error(constants.userMessage.DUPLICATE_EMAIL);
    }

    password = await bcrypt.hash(password, 12);

    const newUser = new User({ name, email, password, totalExpenses: 0 });
    let result = {};
    user = await newUser.save();
    const token = jwt.sign({ userId: user._id }, "apple", {
      expiresIn: "1h",
    });

    result.user = formatMongoData(user);
    result.token = token;

    return result;
  } catch (error) {
    console.log("Something went wrong: Service: createProduct", error);
    throw new Error(error);
  }
};

module.exports.login = async ({ email, password }) => {
  try {
    let user = await User.findOne({ email });
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    const isValid = await bcrypt.compare(password, user?.password);
    if (!isValid) {
      throw new Error(constants.userMessage.INVALID_PASSWORD);
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY || "my-sec-key",
      { expiresIn: "1d" }
    );

    user = formatMongoData(user);

    return { user, token };
  } catch (error) {
    console.log("Something went wrong: Service: createProduct", error);
    throw new Error(error);
  }
};

module.exports.createUser = async (serviceData) => {
  try {
    let user = new User({ ...serviceData });
    let result = await user.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createUser", error);
    throw new Error(error);
  }
};

module.exports.getAllUsers = async () => {
  try {
    let users = await User.find({}).sort({ totalExpenses: -1 });
    return formatMongoData(users);
  } catch (error) {
    console.log("Something went wrong: Service: getAllUsers", error);
    throw new Error(error);
  }
};

module.exports.getUserById = async ({ id }) => {
  try {
    checkObjectId(id);
    let user = await User.findById(id);
    if (!user) {
      throw new Error(constants.userMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(user);
  } catch (error) {
    console.log("Something went wrong: Service: getUserById", error);
    throw new Error(error);
  }
};

module.exports.updateUser = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let user = await User.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!user) {
      throw new Error(constants.userMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(user);
  } catch (error) {
    console.log("Something went wrong: Service: updateUser", error);
    throw new Error(error);
  }
};

module.exports.deleteUser = async ({ id }) => {
  try {
    checkObjectId(id);
    let user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error(constants.userMessage.PRODUCT_NOT_FOUND);
    }
    return formatMongoData(user);
  } catch (error) {
    console.log("Something went wrong: Service: deleteUser", error);
    throw new Error(error);
  }
};
