// checks for user being logged in
require("dotenv").config();
const jwt = require('jsonwebtoken')

// authenticate user (is the user already logged in?)
exports.loginRequired = function (req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
      if (payload) {
        return next()
      } else {
        return next({
          status: 401,
          message: "Please sign in first"
        })
      }
    })
  } catch (err) {
    return next({
      status: 401,
      message: "Please sign in first"
    })
  }
}

// authorize user, make sure it's the correct user creating message
exports.ensureCorrectUser = function (req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, payload) {
      console.log('payload is', payload)
      if (payload && payload.id === req.params.id) {
        return next()
      } else {
        return next({
          status: 401,
          message: "you are not authorized to write this message"
        })
      }
    })
  } catch (err) {
    return next({
      status: 401,
      message: "you are not authorized to write this message"
    })
  }
}