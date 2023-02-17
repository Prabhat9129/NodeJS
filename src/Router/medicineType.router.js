const express = require("express");
const typeRouter = express.Router();
const auth = require("../Middleware/auth.middleware");
const { addType } = require("../Controller/medicineType.controller");
const { getAllTypes } = require("../Services/medicineType.service");
typeRouter.use(auth);

typeRouter.post("/addType", async (req, res) => {
  try {
    const newtype = await addType(req);
    res.status(201).json({
      status: "success",
      data: {
        newType: newtype,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
      message: error.message,
    });
  }
});

typeRouter.get("/allTypes", async (req, res) => {
  try {
    const alltypes = await getAllTypes(req);
    res.status(200).json({
      status: "success",
      data: {
        AllMedicineTypes: alltypes,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fails",
      message: error.message,
    });
  }
});
module.exports = typeRouter;
