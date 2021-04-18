const express = require("express");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

const { getProductById } = require("../controllers/product");

// params
router.sparam("userId", getUserById);
router.param("productId", getProductById);

// routes
// create
// router.post(
//   "/product/create/:userId",
//   isSignedIn,
//   isAuthenticated,
//   isAdmin
//   // createProduct
// );

module.exports = router;
