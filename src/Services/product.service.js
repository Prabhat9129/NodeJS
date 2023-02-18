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

async function getBYIdProducts(user) {
  // console.log(user.params.id);
  const product = await productModel.findOne({
    id: user.params.id,
    addBy: user.user._id,
  });
  return product;
}

async function getTypeProducts(data) {
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

async function recentProducts() {
  const product = productModel.find().sort({ currentDate: -1 }).limit(1);
  return product;
}

async function addLikes(id) {
  // console.log(id.user._id.toString());
  const like = await productModel.findOne({
    _id: id.params.id,
    likes: id.user._id.toString(),
  });
  console.log("like", like);
  let data = {};
  // console.log(data);
  if (like) {
    data.message = "Alredy liked";
    return data;
  } else {
    const dislikes = await productModel.findOne({
      _id: id.params.id,
      dislikes: id.user._id.toString(),
    });

    if (dislikes) {
      await productModel.findByIdAndUpdate(id.params.id, {
        $pull: { dislikes: id.user._id.toString() },
      });
    }
    data = await productModel.findByIdAndUpdate(
      id.params.id,
      {
        $push: { likes: id.user._id.toString() },
      },
      { returnOriginal: false }
    );
  }

  return data;
}

async function adDislikes(id) {
  const dislike = await productModel.findOne({
    _id: id.params.id,
    dislikes: id.user._id.toString(),
  });

  let data = {};
  if (dislike) {
    data.message = "Alredy Dislike";
    return data;
  } else {
    const like = await productModel.findOne({
      _id: id.params.id,
      likes: id.user._id.toString(),
    });

    if (like) {
      await productModel.findByIdAndUpdate(id.params.id, {
        $pull: { likes: id.user._id.toString() },
      });
    }
    data = await productModel.findByIdAndUpdate(
      id.params.id,
      {
        $push: { dislikes: id.user._id.toString() },
      },
      { returnOriginal: false }
    );
  }
  return data;
}

async function addComment(id) {
  console.log(id.params.id, id.body.comment);
  const comment = await productModel.findByIdAndUpdate(
    { _id: id.params.id },
    {
      $push: { comments: { comment: id.body.comment } },
    },
    {
      new: true,
      _id: false,
    }
  );
  return comment;
}

async function mostLikes(data) {
  const likes = await ProductModel.find().sort({ likes: -1 }).limit(1);
  console.log("likes", likes);
  return likes;
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getTypeProducts,
  getBYIdProducts,
  recentProducts,
  addLikes,
  adDislikes,
  addComment,
  mostLikes,
};
