const express = require("express");
const userRouter = require("./Router/user.router");
const productRouter = require("./Router/product.router");
const mtypeRouter = require("./Router/medicineType.router");
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(mtypeRouter);
app.use(productRouter);

module.exports = app;
