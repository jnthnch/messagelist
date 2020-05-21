const mongoose = require("mongoose");
mongoose.set("debug", true); // log mongoose queries in terminal
mongoose.Promise = Promise; // use promises isntead of callbacks

mongoose.connect("mongodb://localhost/actionats", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports.User = require("./user");
module.exports.Selection = require("./selection")
module.exports.Message = require("./message")

