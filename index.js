import express from "express";
import cors from "cors";
import clientRoute from "./routes/client.route.js";
import supplierRoute from "./routes/supplier.route.js";
import productRoute from "./routes/product.route.js";
import saleRoute from './routes/sale.route.js';

const app = express();
app.use(express.json());

app.use(cors());
app.use("/client", clientRoute);
app.use("/supplier", supplierRoute);
app.use("/product", productRoute);
app.use("/sale", saleRoute);

const port = 2100;

app.listen(port, () => {
  console.log(`Servidor aberto na porta: ${port}`);
});
