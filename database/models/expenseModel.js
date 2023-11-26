const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    userId: String,
    amount: Number,
    description: String,
    category: String,
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

module.exports = mongoose.model("Expense", expenseSchema);
