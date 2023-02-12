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

    res.send();
  } catch (err) {
    throw new Error(err);
  }
}

export default {
  createClient,
};
