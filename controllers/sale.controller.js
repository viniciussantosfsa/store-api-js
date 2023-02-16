import saleService from "../services/sale.service.js";
import moment from "moment";

async function createSale(req, res) {
  try {
    let sale = req.body;

    if (!sale.value || !sale.date || !sale.client_id || !sale.product_id) {
      return res
        .status(400)
        .json({ error: "value, date, client_id, product_id required" });
    }

    sale.date = moment(sale.date, "DD/MM/YYYY").format("YYYY-MM-DD");

    sale = await saleService.createSale(sale);

    res.send("Successfully registered");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getSales(req, res) {
  try {
    res.send(await saleService.getSales());
  } catch (err) {
    throw new Error(err);
  }
}

async function getSaleById(req, res) {
  try {
    res.send(await saleService.getSaleById(req.params.id));
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteSale(req, res) {
  try {
    res.send(await saleService.deleteSale(req.params.id));
    res.end();
  } catch (err) {
    throw console.error(err);
  }
}

async function updateSale(req, res) {
  try {
    let sale = req.body;

    if (
      !sale.sale_id ||
      !sale.value ||
      !sale.date ||
      !sale.client_id ||
      !sale.product_id
    ) {
      throw new Error("sale_id, value, date, client_id, product_id required");
    }

    sale = await saleService.updateSale(sale);

    res.send(sale);
  } catch (err) {
    throw new Error(err);
  }
}

export default {
  createSale,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};
