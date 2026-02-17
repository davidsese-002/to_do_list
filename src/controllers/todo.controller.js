const todoService = require("../services/todo.service");
const asyncHandler = require("../utils/asyncHandler");

exports.createTodo = asyncHandler(async (req, res) => {
  const todo = await todoService.createTodo(req.body);
  res.status(201).json(todo);
});

exports.getTodos = asyncHandler(async (req, res) => {
  const todos = await todoService.getTodos();
  res.json(todos);
});

exports.updateTodo = asyncHandler(async (req, res) => {
  const todo = await todoService.updateTodo(req.params.id, req.body);
  res.json(todo);
});

exports.deleteTodo = asyncHandler(async (req, res) => {
  await todoService.deleteTodo(req.params.id);
  res.json({ message: "Todo deleted" });
});
