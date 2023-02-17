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
  manufacturDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  likes: {
    type: String,
  },
  dislikes: {
    type: String,
  },
  comments: {
    type: String,
  },
});
const ProductModel = mongoose.model("medicine", productSchema);
module.exports = ProductModel;
