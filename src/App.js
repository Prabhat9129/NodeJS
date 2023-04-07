const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./Router/user.router");
const { mongoConnection } = require("./Mongoose/connection.mongoose");
const productRouter = require("./Router/product.router");
const mtypeRouter = require("./Router/medicineType.router");
const AppError = require("./Utils/appError");
const ErrorHandllerMiddlwar = require("./Controller/error.controller");
const app = express();

async function connect() {
  try {
    await mongoConnection();
  } catch (err) {
    console.log(`${err.message}`);
  }
}
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
connect();

app.use(userRouter);
app.use(mtypeRouter);
app.use(productRouter);
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fails",
  //   message: `can't find ${req.originalUrl} on this server`,
  // });
  // const err = new Error(`can't find ${req.originalUrl} on this server`);
  // err.status = "fails";
  // err.statusCode = 404;
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(ErrorHandllerMiddlwar);

module.exports = app;
