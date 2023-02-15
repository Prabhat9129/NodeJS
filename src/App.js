const express = require("express");
//const { mongoConnection } = require("../src/Mongoose/connection.mongoose");
const userRouter = require("./Router/user.router");
const mtypeRouter = require("./Router/medicineType.router");
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(mtypeRouter);
// async function mongoose() {
//   return await mongoConnection();
// }
// app.use(mongoose);

module.exports = app;
