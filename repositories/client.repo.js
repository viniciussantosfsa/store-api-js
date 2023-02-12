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

async function getClients() {
  const connection = await connect();
  try {
    const res = await connection.query("SELECT * FROM clients");
    return res.rows;
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
  }
}

async function getClientById(id) {
  const connection = await connect();

  try {
    const res = await connection.query(
      "SELECT * FROM clients WHERE client_id = $1",
      [id]
    );
    return res.rows[0];
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
  }
}

async function deleteClient(id) {
  const connection = await connect();

  try {
    await connection.query("DELETE FROM clients WHERE client_id = $1", [id]);
  } catch (err) {
    throw new Error(err);
  } finally {
    connection.release();
  }
}

async function updateClient(client) {
  const connection = await connect();

  try {
    const sql =
      "UPDATE clients SET name = $1, cpf = $2, phone = $3, email = $4, address = $5 WHERE client_id = $6 RETURNING *";
    const values = [
      client.name,
      client.cpf,
      client.phone,
      client.email,
      client.address,
      client.client_id,
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
  getClients,
  getClientById,
  deleteClient,
  updateClient,
};
