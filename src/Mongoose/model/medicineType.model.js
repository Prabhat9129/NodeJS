const mongoose = require("mongoose");
const medicineTypeSchma = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Name must be unique"],
    require: [true, "Name is Required"],
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    require: [true, "User id is required"],
  },
  addedDate: {
    type: Date,
    default: Date.now(),
  },
});

const typeModel = mongoose.model("medicineType", medicineTypeSchma);
module.exports = typeModel;
