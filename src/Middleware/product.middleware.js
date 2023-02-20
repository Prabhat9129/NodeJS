const { param, body } = require("express-validator");

function AddProduct() {
  return [body("name").trim().isLength({ min: 1 }), body("typeID").isMongoId()];
}

function ParamID() {
  return [param("id").isMongoId()];
}

function EditProduct() {
  return [body("name").trim().isLength({ min: 1 })];
}

function AddComment() {
  return [body("comment").trim().isLength({ min: 1 })];
}

module.exports = {
  AddProduct,
  ParamID,
  EditProduct,
  AddComment,
};
