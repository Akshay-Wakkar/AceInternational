const { productData } = require("./schemas/Product");

exports.saveProduct = async function (data) {
  var productSave;
  var obj = {
    productName: data.productName,
    productImg: data.productImg,
    grossPrice: data.grossPrice,
    vat: data.vat,
    quantity: data.quantity,
    netPrice: data.netPrice,
  };

  let productObj = new productData(obj);
  productSave = await productObj.save();

  if (!productSave || !productSave._id) {
    return {
      data: null,
      message: "Something Went Wrong!",
      value: false,
    };
  } else {
    return {
      data: productSave,
      message: "Saved Successfully",
      value: true,
    };
  }
};

exports.getAllProducts = async function (req, res) {
  let productslist = await productData.find();
  if (productslist.length == 0) {
    return {
      data: null,
      message: "No Products Found!",
      value: false,
    };
  } else {
    return {
      data: productslist,
      count: productslist.length,
      message: "Products Fetched Successfully!",
      value: true,
    };
  }
};
