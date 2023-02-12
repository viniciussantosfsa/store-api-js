import { connect } from "../database/connection.db.js";

async function insertClient(client) {
  const connection = await connect();

  try {
    const sql =
      "INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";

    const values = [
      client.name,
      client.cpf,
      client.phone,
      client.email,
      client.address,
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
  insertClient,
};
