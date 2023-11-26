const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema(
  {
    userId: String,
    resetToken: String,
  },
  {
    timestamps: true,
    toObject: {
      transform: (doc, ret, options) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Password", passwordSchema);
