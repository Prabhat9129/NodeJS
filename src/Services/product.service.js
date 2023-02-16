const productModel = require("../Mongoose/model/product.model");

async function addProduct(req, res) {
  try {
    const newProduct = await productModel.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        Medicine: newProduct,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fails",
      message: error.message,
    });
  }
}
module.exports = { addProduct };
