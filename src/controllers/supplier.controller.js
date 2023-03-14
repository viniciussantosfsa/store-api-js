import supplierService from "../services/supplier.service.js";

async function createSupplier(req, res) {
  try {
    let supplier = req.body;

    if (
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error("name, cnpj, phone, email, address required");
    }

    supplier = await supplierService.createSupplier(supplier);

    res.send("Successfully registered!");
  } catch (err) {
    throw new Error(err);
  }
}

async function getSuppliers(req, res) {
  try {
    res.send(await supplierService.getSuppliers());
  } catch (err) {
    throw new Error(err);
  }
}

async function getSupplierById(req, res) {
  try {
    res.send(await supplierService.getSupplierById(req.params.id));
  } catch (err) {
    throw new Error(err);
  }
}

async function deleteSupplier(req, res) {
  try {
    res.send(await supplierService.deleteSupplier(req.params.id));
    res.end();
  } catch (err) {
    throw new Error(err);
  }
}

async function updateSupplier(req, res) {
  try {
    let supplier = req.body;

    if (
      !supplier.supplier_id ||
      !supplier.name ||
      !supplier.cnpj ||
      !supplier.phone ||
      !supplier.email ||
      !supplier.address
    ) {
      throw new Error("name, cnpj, phone, email, address required");
    }

    supplier = await supplierService.updateSupplier(supplier);

    res.send(supplier);
  } catch (err) {
    throw new Error(err);
  }
}

export default {
  createSupplier,
  getSuppliers,
  getSupplierById,
  deleteSupplier,
  updateSupplier,
};
