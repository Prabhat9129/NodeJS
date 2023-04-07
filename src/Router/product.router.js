const express = require("express");
const ProductRouter = express.Router();
const auth = require("../Middleware/auth.middleware");
const {
  addproduct,
  updateproduct,
  deleteproduct,
  findByIdProduct,
  getAllProduct,
  getByType,
  recentProduct,
  addlikes,
  addislikes,
  addcomment,
  mostlikes,
} = require("../Controller/product.controller");
const {
  AddProduct,
  ParamID,
  EditProduct,
  AddComment,
} = require("../Middleware/product.middleware");
const { Validate } = require("../Middleware/validation.middleware");
// ProductRouter.use(auth);

ProductRouter.post("/addProduct", Validate, AddProduct(), async (req, res) => {
  try {
    const newProduct = await addproduct(req);

    newProduct
      ? res.status(201).send(newProduct)
      : res.status(401).send("Something went wrong");
  } catch (error) {
    res.status(409).send({ Error: error.message });
  }
});

ProductRouter.patch(
  "/updateProduct/:id",
  ParamID(),
  EditProduct(),
  async (req, res) => {
    try {
      const updateProduct = await updateproduct(req);
      updateProduct
        ? res.status(201).send(updateProduct)
        : res.status(401).send("Something went wrong");
    } catch (error) {
      res.status(409).send({ Error: error.message });
    }
  }
);

ProductRouter.delete(
  "/deleteProduct/:id",
  Validate,
  ParamID(),
  async (req, res) => {
    try {
      const deleteProduct = await deleteproduct(req);
      deleteProduct
        ? res.status(201).send(deleteProduct)
        : res.status(401).send("Something went wrong");
    } catch (error) {
      res.status(409).send({ Error: error.message });
    }
  }
);

ProductRouter.get("/products", EditProduct(), async (req, res) => {
  try {
    const Products = await getAllProduct(req);
    Products
      ? res.status(201).send(Products)
      : res.status(401).send("Something went wrong");
  } catch (error) {
    res.status(409).send({ Error: error.message });
  }
});

ProductRouter.get("/products/:id", ParamID(), async (req, res) => {
  try {
    const Product = await findByIdProduct(req);
    Product
      ? res.status(201).send(Product)
      : res.status(401).send("Something went wrong");
  } catch (error) {
    res.status(409).send({ Error: error.message });
  }
});

ProductRouter.get("/typeProducts/:type", async (req, res) => {
  try {
    const Products = await getByType(req);
    Products
      ? res.status(201).send(Products)
      : res.status(401).send("Something went wrong");
  } catch (error) {
    res.status(409).send({ Error: error.message });
  }
});

ProductRouter.get("/recent", async (req, res) => {
  try {
    const Products = await recentProduct(req);
    Products
      ? res.status(201).send(Products)
      : res.status(401).send("Something went wrong");
  } catch (error) {
    res.status(409).send({ Error: error.message });
  }
});

ProductRouter.post("/likes/:id", Validate, ParamID(), async (req, res) => {
  try {
    const like = await addlikes(req);
    like
      ? res.status(201).send(like)
      : res.status(401).send("Something went wrong");
  } catch (error) {
    res.status(409).send({ Error: error.message });
  }
});

ProductRouter.post("/dislikes/:id", Validate, ParamID(), async (req, res) => {
  try {
    const dislike = await addislikes(req);
    dislike
      ? res.status(201).send(dislike)
      : res.status(401).send("Something went wrong");
  } catch (error) {
    res.status(409).send({ Error: error.message });
  }
});

ProductRouter.post(
  "/comment/:id",
  Validate,
  ParamID(),
  AddComment(),
  async (req, res) => {
    try {
      const comment = await addcomment(req);
      comment
        ? res.status(201).send(comment)
        : res.status(401).send("Something went wrong");
    } catch (error) {
      res.status(409).send({ Error: error.message });
    }
  }
);

ProductRouter.get("/mostliked", async (req, res) => {
  try {
    const nuLike = await mostlikes(req);
    nuLike
      ? res.status(201).send(nuLike)
      : res.status(401).send("Something went wrong");
  } catch (error) {
    res.status(409).send({ Error: error.message });
  }
});
module.exports = ProductRouter;
