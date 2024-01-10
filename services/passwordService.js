const Password = require("../database/models/passwordModel");
const User = require("../database/models/userModel");
const bcrypt = require("bcrypt");
const { tranEmailApi } = require("../utils/mailTransporter");
const { generateRandomToken } = require("../utils/tokenGenerate");
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

module.exports.forgotPassword = async (serviceData) => {
  console.log({ serviceData });
  const { email } = serviceData;
  console.log({ email });
  const resetToken = await generateRandomToken();
  const sender = {
    email: "avisihks@gmail.com",
  };
  const receivers = [{ email }];

  try {
    let user = await User.findOneAndUpdate(
      { email },
      { resetToken },
      {
        new: true,
      }
    );

    console.log(user);

    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }

    await Password.create({ userId: user.id, resetToken });

    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Password Reset",
      htmlContent: `
          <p>Hello,</p>
          <p>Please click the following link to reset your password:</p>
          <a href="${process?.env?.CLIENT_URL}/reset-password?token=${resetToken}&email=${email}">Reset Password</a>
        `,
    });

    return { message: "Password reset email sent successfully" };
  } catch (error) {
    console.log("Something went wrong: Service: forgotPassword", error);
    throw new Error(error);
  }
};

module.exports.resetPassword = async (serviceData) => {
  const { email, newPassword } = serviceData;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      {
        new: true,
      }
    );

    return { message: "Password updated successfully" };
  } catch (error) {
    console.log("Something went wrong: Service: resetPassword", error);
    throw new Error(error);
  }
};
