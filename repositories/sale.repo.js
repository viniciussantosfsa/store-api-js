import { connect } from "../database/connection.db.js";

async function insertSale(sale) {
  const connection = await connect();

  try {
    const sql =
      "INSERT INTO sales (client_id, product_id, value, date) VALUES ($1, $2, $3, $4) RETURNING *";

    const values = [sale.client_id, sale.product_id, sale.value, sale.date];

    const res = await connection.query(sql, values);

    return res.rows[0];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to insert sale");
  } finally {
    connection.release();
  }
}

async function getSales() {
  const connection = await connect();
  try {
    const res = await connection.query("SELECT * FROM sales");
    return res.rows;
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
  }
}

async function getSaleById(id) {
  const connection = await connect();

  try {
    const res = await connection.query(
      "SELECT * FROM sales WHERE sale_id = $1",
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
  }
}

async function deleteSale(id) {
  const connection = await connect();

  try {
    await connection.query("DELETE FROM sales WHERE sale_id = $1", [id]);
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
  }
}

async function updateSale(sale) {
  const connection = await connect();

  try {
    const sql =
      "UPDATE sales SET value = $1, date = $2, client_id = $3, product_id = $4 WHERE sale_id = $5 RETURNING *";
    const values = [
      sale.value,
      sale.date,
      sale.client_id,
      sale.product_id,
      sale.sale_id,
    ];

    const res = await connection.query(sql, values);
    return res.rows[0];
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
  }
}

export default {
  insertSale,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};
