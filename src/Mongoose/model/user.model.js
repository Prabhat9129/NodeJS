const mongoose = require("mongoose");
const validator = require("validator");

const userschma = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Enter a Unique name"],
    require: [true, "Name is Required field"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Please Provide a valid Email"],
    require: [true, "Email is Reaquired"],
  },
  number: {
    type: Number,
    require: true,
  },
  password: {
    unique: [true, "password must be unique"],
    type: String,
  },
});

const model = mongoose.model("user", userschma);
module.exports = model;
