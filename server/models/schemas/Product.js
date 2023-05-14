const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var productSchema = Schema({
  productName: {
    type: String,
    required: [true, "Product name is required field"],
  },
  productImg: {
    type: String,
    required: [true, "Product image is required field"],
  },
  grossPrice: {
    type: Number,
    required: [true, "Product gross price is required field"],
  },
  vat: {
    type: String,
    required: [true, "Vat is required field"],
  },
  quantity: {
    type: Number,
    required: [true, "Product quantity is required field"],
  },
  netPrice: {
    type: Number,
    required: [true, "Product net price is required field"],
  },
});

var productData = mongoose.model("Products", productSchema);

module.exports = {
  productData,
};
