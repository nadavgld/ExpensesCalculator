const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  app.use("/api/logs", require("./api/logs"));

  app.use("*", (req, res) => {
    res.send("<h1> 404 Not Found </h1>");
  });

  const PORT =  process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`running server on ${PORT}`);
  });
});
