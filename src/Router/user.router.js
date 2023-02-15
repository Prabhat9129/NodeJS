const express = require("express");
const Router = express.Router();
const { addUser } = require("../Services/user.service");

Router.post("/signup", addUser);

module.exports = Router;
