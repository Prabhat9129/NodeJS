const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getTypeProducts,
} = require("../Services/product.service");

async function addproduct(data) {
  return await addProduct(data);
}

async function updateproduct(data) {
  return await updateProduct(data);
}

async function deleteproduct(data) {
  return await deleteProduct(data);
}

async function getAllProduct(data) {
  return await getProducts(data);
}

async function getByType(data) {
  return await getTypeProducts(data);
}
module.exports = {
  addproduct,
  updateproduct,
  deleteproduct,
  getAllProduct,
  getByType,
};
