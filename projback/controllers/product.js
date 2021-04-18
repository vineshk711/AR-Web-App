const Product = require("../models/category");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      res.status(400).json({
        error: "No product found in DB"
      });
    }
    req.product = product;
    next();
  });
};
