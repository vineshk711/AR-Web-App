const express = require("express");
const router = express.Router();
const { getUserById } = require("../controllers/user");
const { getProductById, createProduct } = require("../controllers/category");

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

// routes
// create
router.post("/product/create/:userId", createProduct);

module.exports = router;
