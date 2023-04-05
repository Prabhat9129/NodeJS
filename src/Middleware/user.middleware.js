const { body } = require("express-validator");

function SignupCheck() {
  return [
    body("name").trim().isLength({ min: 1 }),
    body("email").isEmail(),
    body("number").isMobilePhone("en-IN"),
    body("password").trim().isLength({ min: 8, max: 30 }),
  ];
}

function LoginCheck() {
  return [
    body("email").isEmail(),
    body("password").trim().isLength({ min: 8, max: 30 }),
  ];
}

module.exports = {
  SignupCheck,
  LoginCheck,
};
