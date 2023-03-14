import { connect } from "../database/connection.db.js";

async function insertSupplier(supplier) {
  const connection = await connect();

  try {
    const sql =
      "INSERT INTO suppliers (name, cnpj, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    const values = [
      supplier.name,
      supplier.cnpj,
      supplier.phone,
      supplier.email,
      supplier.address,
    ];

    const res = await connection.query(sql, values);

    return res.rows[0];
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
  }
}

async function getSuppliers() {
  const connection = await connect();
  try {
    const res = await connection.query("SELECT * FROM suppliers");
    return res.rows;
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
  }
}

async function getSupplierById(id) {
  const connection = await connect();

  try {
    const res = await connection.query(
      "SELECT * FROM suppliers WHERE supplier_id = $1",
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
  }
}

async function deleteSupplier(id) {
  const connection = await connect();

  try {
    await connection.query("DELETE FROM suppliers WHERE supplier_id = $1", [
      id,
    ]);
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
  }
}

async function updateSupplier(supplier) {
  const connection = await connect();

  try {
    const sql =
      "UPDATE suppliers SET name = $1, cnpj = $2, phone = $3, email = $4, address = $5 WHERE supplier_id = $6 RETURNING *";
    const values = [
      supplier.name,
      supplier.cnpj,
      supplier.phone,
      supplier.email,
      supplier.address,
      supplier.supplier_id,
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
  insertSupplier,
  getSuppliers,
  getSupplierById,
  deleteSupplier,
  updateSupplier,
};
