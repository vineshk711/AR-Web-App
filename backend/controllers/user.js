const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Something went wrong or No user found!"
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.encry_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return req.status(400).json({
          error: "Unable to update user"
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchasedList = (req, res) => {
  Order.orderCollection
    .find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err || !orders) {
        res.status(400).json({
          error: "You have no order yet!"
        });
      }
      res.json(orders);
    });
};

// middleware for updating orders automatically into order array in user model
exports.pushOrderInPurchaseList = (req, res, next) => {
  const purchases = [];
  req.body.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });
  // Store the above array to DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to update order array"
        });
      }
      next();
    }
  );
};
