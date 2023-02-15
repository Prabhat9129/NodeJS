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
  addDate: {
    type: Date,
    default: Date.now(),
  },
  likes: {
    type: String,
  },
  dislikes: {
    type: string,
  },
  comments: {
    type: string,
  },
});
const ProductModel = mongoose.model("medicine", productSchema);
module.exports = ProductModel;
