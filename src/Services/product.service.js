const productModel = require("../Mongoose/model/product.model");

async function addProduct(req, res) {
  try {
    const newProduct = await productModel.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        values: newProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
      message: error.message,
    });
  }
}
module.exports = { productModel };
