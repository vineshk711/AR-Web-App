const express = require("express");
const router = express.Router();

const {
  getCategoryById,
  getCategory,
  getAllCategories,
  updateCategory,
  createCategory
} = require("../controllers/category");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

// the routes goes here
// create
router.post(
  "category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

// read
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategories);

// update
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// delete

module.exports = router;
