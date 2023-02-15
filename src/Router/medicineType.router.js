const express = require("express");
const typeRouter = express.Router();
const { addType, findTypes } = require("../Services/medicineType.service");

typeRouter.post("/addType", addType);
typeRouter.get("/findAllTypes", findTypes);
module.exports = typeRouter;
