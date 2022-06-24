const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name too short"),
    check("email").isEmail().withMessage("Enter a valid Email"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password too short")
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("Enter a valid e-mail"),
    check("password").isLength({ min: 1 }).withMessage("Invalid password")
  ],
  signin
);

router.get("/signout", signout);
module.exports = router;
