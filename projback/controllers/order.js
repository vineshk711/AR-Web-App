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
