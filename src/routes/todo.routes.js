const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  createTodo,
  getTodos
} = require("../controllers/todo.controller");


router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodos);

module.exports = router;
