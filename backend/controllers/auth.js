const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      in: errors.array()[0].params,
      error: errors.array()[0].msg
    });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Email already registered!"
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id
    });
  });
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      in: errors.array()[0].params,
      error: errors.array()[0].msg
    });
  }
  const { email, password } = req.body;
  await User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong"
      });
    }
    if (!user) {
      return res.status(400).json({
        error: "Email not registered"
      });
    }
    if (!user.auth(password)) {
      return res.status(401).json({
        error: "Invalid password!"
      });
    }
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    // put token into cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    // send request to font end
    const { _id, name, email, role } = user;
    return res.status(200).json({
      token,
      user: { _id, name, email, role }
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signed out"
  });
};

// protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth"
});

// custom middleware
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access Denied!"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  const role = req.profile.role === 0;
  if (role) {
    return res.status(403).json({
      error: "Access Denied, Only Admins are allowed!"
    });
  }
  next();
};
