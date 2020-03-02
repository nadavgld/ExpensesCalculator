const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const LogSchema = new Schema({
  title: {
    type: String,
    default: "Untitled"
  },
  category: {
    type: String,
    default: "OTHER"
  },
  amount: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Log", LogSchema);
