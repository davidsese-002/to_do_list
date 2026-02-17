const Todo = require("../models/todo.model");

const createTodo = (data) => Todo.create(data);
const getTodos = () => Todo.find();
const updateTodo = (id, data) =>
  Todo.findByIdAndUpdate(id, data, { new: true });
const deleteTodo = (id) => Todo.findByIdAndDelete(id);

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
