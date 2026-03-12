const express = require("express");
const { body } = require("express-validator");

const { registerUser, loginUser } = require("../controllers/auth.controller");

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 })
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").notEmpty()
  ],
  loginUser
);

module.exports = router;