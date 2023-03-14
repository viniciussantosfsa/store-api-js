import productService from "../services/product.service.js";

async function createProduct(req, res) {
  try {
    let product = req.body;

    if (
      !product.name ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id
    ) {
      throw new Error("name, description, value, stock, supplier_id required");
    }

    product = await productService.createProduct(product);

    res.send("Successfully registered!");
  } catch (err) {
    throw new Error(err);
  }
}

async function getProducts(req, res) {
  try {
    res.send(await productService.getProducts());
  } catch (err) {
    throw new Error(err);
  }
}

async function getProductById(req, res) {
  try {
    res.send(await productService.getProductById(req.params.id));
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteProduct(req, res) {
  try {
    res.send(await productService.deleteProduct(req.params.id));
    res.end();
  } catch (err) {
    throw new Error(err);
  }
}

async function updateProduct(req, res) {
  try {
    let product = req.body;

    if (
      !product.product_id ||
      !product.name ||
      !product.description ||
      !product.value ||
      !product.stock ||
      !product.supplier_id
    ) {
      throw new Error("name, description, value, stock, supplier_id required");
    }

    product = await productService.updateProduct(product);

    res.send(product);
  } catch (err) {
    throw new Error(err);
  }
}

export default {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
