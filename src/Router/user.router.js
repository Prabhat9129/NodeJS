const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Route = express.Router();
const { addUser, loginUser } = require("../Services/user.service");
const { SignupCheck, LoginCheck } = require("../Middleware/user.middleware.js");
const { Validate } = require("../Middleware/validation.middleware");
const asyncFunction = require("../Utils/asycFunction");

Route.post(
  "/signup",
  SignupCheck(),
  Validate,
  asyncFunction(async (req, res, next) => {
    const response = await addUser(req);
    response.message
      ? res.status(409).send(response)
      : res.status(201).send(response);
  })
);

Route.post(
  "/signin",
  LoginCheck(),
  Validate,
  asyncFunction(async (req, res) => {
    const id = await loginUser(req.body);
    const data = { token: "" };
    if (id) {
      data.token = jwt.sign(id, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIREIN,
      });
    }
    id
      ? res.status(200).send(data)
      : res.status(403).send("Invalid Email or Password");
  })
);

module.exports = Route;
