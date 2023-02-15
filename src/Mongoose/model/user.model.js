const mongoose = require("mongoose");

const userschma = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  number: {
    type: Number,
  },
  password: {
    type: String,
  },
});

const model = mongoose.model("user", userschma);
module.exports = model;
