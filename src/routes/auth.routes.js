const express = require("express");
const router = express.Router();

const {
  register,
  login,
  requestReset,
  resetPassword,
  changePassword,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);

// password reset
router.post("/request-reset", requestReset);
router.post("/reset-password", resetPassword);

// change password (protected)
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;