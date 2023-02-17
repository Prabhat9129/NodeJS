const productModel = require("../Mongoose/model/product.model");
const modelType = require("../Mongoose/model/medicineType.model");
const ProductModel = require("../Mongoose/model/product.model");

async function addProduct(data) {
  const mType = await modelType.findOne({ name: data.body.mtype });

  const newProduct = await productModel.insertMany({
    name: data.body.name,
    addBy: data.user._id,
    mtype: mType._id,
    manufacturDate: data.body.manufacturDate,
    expiryDate: data.body.expiryDate,
    likes: data.body.likes,
    dislikes: data.body.dislikes,
    comments: data.body.comments,
  });
  return newProduct;
}

async function updateProduct(data) {
  const product = await productModel.findOne({ id: data.params });
  const mType = await modelType.findOne({ name: data.body.mtype });
  const updateProduct = await ProductModel.findByIdAndUpdate(
    product._id.toString(),
    {
      name: data.body.name,
      addBy: data.user._id.toString(),
      mtype: mType._id.toString(),
      manufacturDate: data.body.manufacturDate,
      expiryDate: data.body.expiryDate,
      likes: data.body.likes,
      dislikes: data.body.dislikes,
      comments: data.body.comments,
    },
    {
      new: true,
    }
  );
  return updateProduct;
}

async function deleteProduct(data) {
  const product = await productModel.findOne({ id: data.params });

  const deleteProduct = productModel.findByIdAndDelete(product._id.toString());
  return deleteProduct;
}

async function getProducts(user) {
  const products = await productModel.find({ addBy: user.user._id });
  return products;
}

async function getTypeProducts(data) {
  // console.log(data.params);
  // const product = await modelType.findOne({ name: data.body.mtype });
  // console.log(product);
  const typeproducts = await ProductModel.aggregate([
    {
      $lookup: {
        from: "medicinetypes",
        localField: "mtype",
        foreignField: "_id",
        as: "medicinetypes",
      },
    },
    {
      $unwind: "$medicinetypes",
    },
    {
      $match: {
        "medicinetypes.name": {
          $in: [new RegExp(data.params, "i")],
        },
      },
    },
  ]);
  return typeproducts;
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getTypeProducts,
};
