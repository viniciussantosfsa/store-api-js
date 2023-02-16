import { connect } from "../database/connection.db.js";
import saleRepo from "../repositories/sale.repo.js";
// import clientRepo from "../repositories/client.repo.js";
import productRepo from "../repositories/product.repo.js";

async function createSale(sale) {
  const connection = await connect();

  try {
    await connection.query("BEGIN");

    const product = await productRepo.getProductById(sale.product_id);

    if (product.stock > 0) {
      sale = await saleRepo.insertSale(sale);
      product.stock--;
      await productRepo.updateProduct(product);

      await connection.query("COMMIT");

      return sale;
    } else {
      await connection.query("ROLLBACK");

      throw new Error("The specified product is out of stock");
    }
  } catch (err) {
    await connection.query("ROLLBACK");

    throw err;
  } finally {
    connection.release();
  }
}

async function getSales() {
  return await saleRepo.getSales();
}

async function getSaleById(id) {
  return await saleRepo.getSaleById(id);
}

async function deleteSale(id) {
  const connection = await connect();

  try {
    await connection.query("BEGIN");

    const sale = await saleRepo.getSaleById(id);
    const product = await productRepo.getProductById(sale.product_id);

    // !
    if (product.stock > 0) {
      await saleRepo.deleteSale(id);
      product.stock++;
      await productRepo.updateProduct(product);

      await connection.query("COMMIT");

      return sale;
    } else {
      await connection.query("ROLLBACK");

      throw new Error("The specified product is out of stock");
    }
  } catch (err) {
    await connection.query("ROLLBACK");

    throw err;
  } finally {
    connection.release();
  }
}

async function updateSale(sale) {
  return saleRepo.updateSale(sale);
}

// function error(e) {
//   throw new Error(`The ${e} reported does not exist.`);
// }

export default {
  createSale,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};
