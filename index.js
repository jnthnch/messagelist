require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandlers = require('./handlers/error');
const authRoutes = require('./routes/auth')

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes)

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
})

app.use(errorHandlers)

app.listen(PORT, function () {
  console.log(`Server starting on port ${PORT}`)
})