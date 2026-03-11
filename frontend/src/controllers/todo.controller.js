const Todo = require("../models/todo.model");

exports.createTodo = async (req, res) => {

  try {

    const todo = await Todo.create({
      title: req.body.title,
      user: req.userId
    });

    res.status(201).json(todo);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getTodos = async (req, res) => {

  try {

    const todos = await Todo.find({ user: req.userId });

    res.json(todos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
