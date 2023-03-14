import productRepo from "../repositories/product.repo.js";

async function createProduct(product) {
  return await productRepo.insertProduct(product);
}

async function getProducts() {
  return await productRepo.getProducts();
}

async function getProductById(id) {
  return await productRepo.getProductById(id);
}

async function deleteProduct(id) {
  await productRepo.deleteProduct(id);
}

async function updateProduct(product) {
  return productRepo.updateProduct(product);
}

export default {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
