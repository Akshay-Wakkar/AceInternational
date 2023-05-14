const express = require("express");
const db = require("./db");
const app = express();
const PORT = 5000;
const cors = require("cors");
const productRouter = require("./router/productRouter");

app.use(cors());

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log("App listening on port:" + PORT);
});
