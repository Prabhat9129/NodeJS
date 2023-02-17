const express = require("express");
const ProductRouter = express.Router();
const auth = require("../Middleware/auth.middleware");
const {
  addproduct,
  updateproduct,
  deleteproduct,
  getAllProduct,
  getByType,
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
module.exports = ProductRouter;
