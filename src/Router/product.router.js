const express = require("express");
const ProductRouter = express.Router();
const { addProduct } = require("../Services/product.service");

ProductRouter.post("/addProduct", addProduct);

module.exports = ProductRouter;
