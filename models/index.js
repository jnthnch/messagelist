const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/actionats", {
  keepAlive: true,
  useMongoClient: true
});
