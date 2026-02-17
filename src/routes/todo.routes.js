const express = require("express");
const router = express.Router();
const controller = require("../controllers/todo.controller");

router.post("/", controller.createTodo);
router.get("/", controller.getTodos);
router.put("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

module.exports = router;
