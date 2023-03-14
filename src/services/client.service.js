import clientRepo from "../repositories/client.repo.js";

async function createClient(client) {
  return await clientRepo.insertClient(client);
}

async function getClients() {
  return await clientRepo.getClients();
}

async function getClientById(id) {
  return await clientRepo.getClientById(id);
}

async function deleteClient(id) {
  await clientRepo.deleteClient(id);
}

async function updateClient(client) {
  return clientRepo.updateClient(client);
}

export default {
  createClient,
  getClients,
  getClientById,
  deleteClient,
  updateClient,
};
