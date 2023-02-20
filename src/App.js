const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./Router/user.router");
const { mongoConnection } = require("./Mongoose/connection.mongoose");
const productRouter = require("./Router/product.router");
const mtypeRouter = require("./Router/medicineType.router");
const app = express();

async function connect() {
  try {
    await mongoConnection();
  } catch (err) {
    console.log(`${err.message}`);
  }
}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

connect();

app.use(userRouter);
app.use(mtypeRouter);
app.use(productRouter);
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fails",
    message: `can't find ${req.originalUrl} on this server`,
  });
});
module.exports = app;
