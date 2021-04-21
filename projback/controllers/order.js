const { Order, ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next) => {
  Order.findById(id)
    .populate("products.porduct", "name price")
    .exec((err, order) => {
      if (err) {
        res.status(400).json({
          error: "No order found in DB!"
        });
      }
      req.order = order;
    });
  next();
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB"
      });
    }
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "No order found in DB!"
        });
      }
      res.json(orders);
    });
};
