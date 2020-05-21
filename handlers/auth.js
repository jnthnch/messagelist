const db = require("../models");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
  //find user
  try {
    let user = await db.User.findOne({
      email: req.body.email
    })
    let { id, username, profileImageUrl } = user;
    //check if password from db matches what user sent to server
    let isMatch = await user.comparePassword(req.body.password, next);
    if (isMatch) {
      // lets make a token
      let token = jwt.sign({
        id,
        username,
        profileImageUrl
      }, process.env.SECRET_KEY)
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      })
    } else {
      return next({
        status: 400,
        message: "invalid password"
      })
    }
  } catch (err) {
    return next({
      status: 400,
      message: "invalid email or password"
    })
  }

};

exports.signup = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body)
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign(
      {
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username/email is already taken";
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};
