import supplierRepo from "../repositories/supplier.repo.js";

async function createSupplier(supplier) {
  return await supplierRepo.insertSupplier(supplier);
}

async function getSuppliers() {
  return await supplierRepo.getSuppliers();
}

async function getSupplierById(id) {
  return await supplierRepo.getSupplierById(id);
}

async function deleteSupplier(id) {
  await supplierRepo.deleteSupplier(id);
}

async function updateSupplier(supplier) {
  return supplierRepo.updateSupplier(supplier);
}

export default {
  createSupplier,
  getSuppliers,
  getSupplierById,
  deleteSupplier,
  updateSupplier,
};
