const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      res.status(400).json({
        error: "No category found in DB"
      });
    }
    req.category = cate;
    next();
  });
};
