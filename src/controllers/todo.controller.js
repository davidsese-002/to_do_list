const Todo = require("../models/todo.model");

exports.createTodo = async (req, res) => {

  try {

    const todo = await Todo.create({
      title: req.body.title,
      user: req.user.id
    });

    res.status(201).json(todo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


exports.getTodos = async (req, res) => {

  try {

    const todos = await Todo.find({ user: req.user.id });

    res.json(todos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


exports.updateTodo = async (req, res) => {

  try {

    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(todo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};


exports.deleteTodo = async (req, res) => {

  try {

    await Todo.findByIdAndDelete(req.params.id);

    res.json({ message: "Todo deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};