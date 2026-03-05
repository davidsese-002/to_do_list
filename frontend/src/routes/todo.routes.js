const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} = require("../controllers/todo.controller");

router.post("/", auth, createTodo);
router.get("/", auth, getTodos);
router.put("/:id", auth, updateTodo);
router.delete("/:id", auth, deleteTodo);

module.exports = router;
