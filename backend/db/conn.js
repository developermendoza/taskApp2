require("dotenv").config();
const mongoose = require("mongoose");

module.exports = mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("connected to db");
    } else {
      console.log("error");
    }
  }
);
