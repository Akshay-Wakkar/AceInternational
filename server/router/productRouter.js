const express = require("express");
const {
  AddProduct,
  GetAllProductsList,
} = require("../controllers/ProductController");

var productRouter = express.Router();
productRouter.use(express.json({ limit: "10mb" }));

productRouter.use(express.urlencoded({ limit: "10mb", extended: true }));
//Products Routes

productRouter.route("/").get(GetAllProductsList).post(AddProduct);

module.exports = productRouter;
