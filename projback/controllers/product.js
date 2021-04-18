const Product = require("../models/category");
const formidable = require("formidable");
const loadsh = require("loadsh");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "No product found in DB"
      });
    }
    req.product = product;
    next();
  });
};

exports.createProduct = (req, res) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with Image"
      });
    }
    // destructuring of fields
    const { name, description, price, category, stock } = fields;
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please fill all Fields"
      });
    }

    let product = new Product(fields);

    // handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.conteentType = file.photo.type;
    }
    // dave data to DB
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving product in DB failed!"
        });
      }
      res.json(product);
    });
  });
};
