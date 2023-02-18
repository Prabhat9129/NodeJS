const express = require("express");
const ProductRouter = express.Router();
const auth = require("../Middleware/auth.middleware");
const {
  addproduct,
  updateproduct,
  deleteproduct,
  getAllProduct,
  getByType,
  recentProduct,
  addlikes,
  addislikes,
  addcomment,
  mostlikes,
} = require("../Controller/product.controller");
ProductRouter.use(auth);

ProductRouter.post("/addProduct", async (req, res) => {
  try {
    const newProduct = await addproduct(req);

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
});

ProductRouter.patch("/updateProduct/:id", async (req, res) => {
  try {
    const updateProduct = await updateproduct(req);

    res.status(200).json({
      status: "success",
      data: {
        UpdatedMedicine: updateProduct,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fails",
      message: error.message,
    });
  }
});

ProductRouter.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const deleteProduct = await deleteproduct(req);
    res.status(200).json({
      status: "success",
      data: {
        DeletedMedicine: deleteProduct,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fails",
      message: error.message,
    });
  }
});

ProductRouter.get("/products", async (req, res) => {
  try {
    const Products = await getAllProduct(req);
    res.status(200).json({
      status: "success",
      data: {
        Medicines: Products,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fails",
      message: error.message,
    });
  }
});

ProductRouter.get("/typeProducts/:type", async (req, res) => {
  try {
    const Products = await getByType(req);
    res.status(200).json({
      status: "success",
      data: {
        TypeOfMedicines: Products,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fails",
      message: error.message,
    });
  }
});

ProductRouter.get("/recent", async (req, res) => {
  try {
    const Products = await recentProduct(req);
    res.status(200).json({
      status: "success",
      data: {
        RecentMedicines: Products,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fails",
      message: error.message,
    });
  }
});

ProductRouter.post("/likes/:id", async (req, res) => {
  try {
    const like = await addlikes(req);
    res.status(200).json({
      status: "success",
      data: {
        likeproduct: like,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fails",
      message: error.message,
    });
  }
});

ProductRouter.post("/dislikes/:id", async (req, res) => {
  try {
    const dislike = await addislikes(req);
    res.status(200).json({
      status: "success",
      data: {
        Dislikeproduct: dislike,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fails",
      message: error.message,
    });
  }
});

ProductRouter.post("/comment/:id", async (req, res) => {
  try {
    const comment = await addcomment(req);
    res.status(200).json({
      status: "success",
      data: {
        comments: comment,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fails",
      message: error.message,
    });
  }
});

ProductRouter.get("/mostliked", async (req, res) => {
  try {
    const nuLike = await mostlikes(req);
    res.status(200).json({
      status: "success",
      data: {
        likes: nuLike,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fails",
      message: error.message,
    });
  }
});
module.exports = ProductRouter;
