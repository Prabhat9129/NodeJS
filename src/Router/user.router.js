const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const Route = express.Router();
const { addUser, loginUser } = require("../Services/user.service");
const { SignupCheck, LoginCheck } = require("../Middleware/user.middleware.js");
const { Validate } = require("../Middleware/validation.middleware");

Route.post("/signup", SignupCheck(), Validate, async (req, res) => {
  try {
    const response = await addUser(req);
    response.message
      ? res.status(409).send(response)
      : res.status(201).send(response);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

Route.post("/signin", LoginCheck(), Validate, async (req, res) => {
  try {
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
  } catch (err) {
    res.status(409).send({ Error: err.message });
  }
});

module.exports = Route;
