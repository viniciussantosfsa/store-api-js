import clientService from "../services/client.service.js";

async function createClient(req, res) {
  try {
    let client = req.body;

    if (
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error("name, cpf, phone, email, address required");
    }

    client = await clientService.createClient(client);

    res.send("Successfully registered customer!");
  } catch (err) {
    throw new Error(err);
  }
}

async function getClients(req, res) {
  try {
    res.send(await clientService.getClients());
  } catch (err) {
    throw new Error(err);
  }
}

async function getClientById(req, res) {
  try {
    res.send(await clientService.getClientById(req.params.id));
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteClient(req, res) {
  try {
    res.send(await clientService.deleteClient(req.params.id));
    res.end();
  } catch (err) {
    throw new Error(err);
  }
}

async function updateClient(req, res) {
  try {
    let client = req.body;

    if (
      !client.client_id ||
      !client.name ||
      !client.cpf ||
      !client.phone ||
      !client.email ||
      !client.address
    ) {
      throw new Error("name, cpf, phone, email, address required");
    }

    client = await clientService.updateClient(client);

    res.send(client);
  } catch (err) {
    throw new Error(err);
  }
}

export default {
  createClient,
  getClients,
  getClientById,
  deleteClient,
  updateClient,
};
