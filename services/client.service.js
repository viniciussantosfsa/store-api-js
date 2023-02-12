import clientRepo from "../repositories/client.repo.js";

async function createClient(client) {
  return await clientRepo.insertClient(client);
}

export default {
  createClient,
};