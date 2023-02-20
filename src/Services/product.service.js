const productModel = require("../Mongoose/model/product.model");
const modelType = require("../Mongoose/model/medicineType.model");
const ProductModel = require("../Mongoose/model/product.model");

async function addProduct(data) {
  try {
    const mType = await modelType.findOne({ name: data.body.mtype });
    const check = await productModel.findOne({
      name: data.body.name,
    });
    let newProduct = {};

    if (check) {
      newProduct.message = "Product Alredy Exits";
      return newProduct;
    } else {
      newProduct = await productModel.insertMany({
        name: data.body.name,
        addBy: data.user._id,
        mtype: mType._id,
        manufacturDate: data.body.manufacturDate,
        expiryDate: data.body.expiryDate,
      });
      return newProduct;
    }
  } catch (err) {
    throw err;
  }
}

async function updateProduct(data) {
  try {
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
  } catch (err) {
    throw err;
  }
}

async function deleteProduct(data) {
  try {
    const product = await productModel.findOne({ id: data.params });
    const deleteProduct = productModel.findByIdAndDelete(
      product._id.toString()
    );
    return deleteProduct;
  } catch (err) {
    throw err;
  }
}

async function getProducts(user) {
  try {
    const products = await productModel.find({ addBy: user.user._id });
    return products;
  } catch (err) {
    throw err;
  }
}

async function getBYIdProducts(user) {
  try {
    const product = await productModel.findOne({
      id: user.params.id,
      addBy: user.user._id,
    });
    return product;
  } catch (err) {
    throw err;
  }
}

async function getTypeProducts(data) {
  try {
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
            $in: [new RegExp(data.params.type, "i")],
          },
        },
      },
    ]);
    return typeproducts;
  } catch (err) {
    throw err;
  }
}

async function recentProducts() {
  try {
    const product = productModel.find().sort({ currentDate: -1 }).limit(1);
    return product;
  } catch (err) {
    throw err;
  }
}

async function addLikes(id) {
  try {
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
  } catch (err) {
    throw err;
  }
}

async function adDislikes(id) {
  try {
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
  } catch (err) {
    throw err;
  }
}

async function addComment(id) {
  try {
    // console.log(id.params.id, id.body.comment);
    const comment = await productModel.findByIdAndUpdate(
      id.params.id,
      {
        $push: { comments: { comment: id.body.comment } },
      },
      {
        new: true,
        _id: false,
      }
    );

    console.log(comment);
    return comment ? comment : null;
  } catch (err) {
    throw err;
  }
}

async function mostLikes(data) {
  try {
    const likes = await ProductModel.find().sort({ likes: -1 }).limit(1);
    console.log("likes", likes);
    return likes;
  } catch (err) {
    throw err;
  }
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
