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
  getBYIdProducts,
} = require("../Services/product.service");

async function addproduct(data) {
  try {
    return await addProduct(data);
  } catch (err) {
    throw err;
  }
}

/**
 *
 * @param {*} data
 * @returns
 */
async function updateproduct(data) {
  try {
    return await updateProduct(data);
  } catch (err) {
    throw err;
  }
}

/**
 *
 * @param {*} data
 * @returns
 */
async function deleteproduct(data) {
  try {
    return await deleteProduct(data);
  } catch (err) {
    throw err;
  }
}

async function getAllProduct(data) {
  try {
    return await getProducts(data);
  } catch (err) {
    throw err;
  }
}
async function findByIdProduct(data) {
  try {
    return await getBYIdProducts(data);
  } catch (err) {
    throw err;
  }
}

async function getByType(data) {
  try {
    return await getTypeProducts(data);
  } catch (err) {
    throw err;
  }
}

async function recentProduct() {
  try {
    return await recentProducts();
  } catch (err) {
    throw err;
  }
}

async function addlikes(id) {
  try {
    return await addLikes(id);
  } catch (err) {
    throw err;
  }
}

async function addislikes(id) {
  try {
    return await adDislikes(id);
  } catch (err) {
    throw err;
  }
}

async function addcomment(id) {
  try {
    return await addComment(id);
  } catch (err) {
    throw err;
  }
}

async function mostlikes(data) {
  try {
    return await mostLikes(data);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  addproduct,
  updateproduct,
  deleteproduct,
  getAllProduct,
  findByIdProduct,
  getByType,
  recentProduct,
  addlikes,
  addislikes,
  addcomment,
  mostlikes,
};
