const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: String,
    paymentId: String,
    orderStatus: String,
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

module.exports = mongoose.model("Order", orderSchema);
