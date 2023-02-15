const mongoose = require("mongoose");
const medicineTypeSchma = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
  },
  addedBy: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    require: true,
  },
  addedDate: {
    type: Date,
    default: Date.now(),
  },
});

const typeModel = mongoose.model("medicineType", medicineTypeSchma);
module.exports = typeModel;
