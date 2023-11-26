const mongoose = require("mongoose");

const downloadSchema = new mongoose.Schema(
  { userId: String, fileLink: String },
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

module.exports = mongoose.model("Download", downloadSchema);
