const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
  } catch (error) {
    throw new Error(error);
  }
};
