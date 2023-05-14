const { saveProduct, getAllProducts } = require("../models/ProductModel");

exports.AddProduct = async (req, res) => {
  try {
    let savedProductData = await saveProduct(req.body);
    console.log(savedProductData, "d");
    if (savedProductData.value) {
      res.status(200).json(savedProductData);
    } else {
      res.status(500).json(savedProductData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.GetAllProductsList = async (req, res) => {
  try {
    let allProducts = await getAllProducts();
    if (allProducts.value) {
      res.status(200).json(allProducts);
    } else {
      res.status(500).json(allProducts);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
