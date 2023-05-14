const mongoose = require("mongoose");
const dbUrl = "mongodb://0.0.0.0:27017/inventory";

mongoose.connect(dbUrl, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log("MongoDb connected...");
  } else {
    console.log(`Error:${err}`);
  }
});
