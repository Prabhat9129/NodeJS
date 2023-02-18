const {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getTypeProducts,
  recentProducts,
  addLikes,
  adDislikes,
  addComment,
  mostLikes,
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

async function recentProduct() {
  return await recentProducts();
}

async function addlikes(id) {
  return await addLikes(id);
}

async function addislikes(id) {
  return await adDislikes(id);
}

async function addcomment(id) {
  return await addComment(id);
}

async function mostlikes(data) {
  return await mostLikes(data);
}

module.exports = {
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
};
