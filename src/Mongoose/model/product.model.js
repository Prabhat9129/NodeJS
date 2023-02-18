const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  addBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: [true],
  },
  mtype: {
    type: mongoose.Types.ObjectId,
    ref: "medicineType",
    required: true,
  },
  currentDate: {
    type: Date,
    default: Date.now(),
  },
  manufacturDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Types.ObjectId, ref: "user", required: true }],
  },
  dislikes: {
    type: [{ type: mongoose.Types.ObjectId, ref: "user", required: true }],
  },
  comments: {
    type: [
      {
        userid: { type: mongoose.Types.ObjectId },
        comment: { type: String, reqired: true },
      },
    ],
  },
});
const ProductModel = mongoose.model("medicine", productSchema);
module.exports = ProductModel;
