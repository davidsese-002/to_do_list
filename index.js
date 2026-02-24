const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let todos = [];
let currentId = 1;

// Get all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Add a todo
app.post("/todos", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const todo = {
    id: currentId++,
    text,
    completed: false
  };

  todos.push(todo);
  res.status(201).json(todo);
});

// Update todo (mark complete)
app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  todo.completed = !todo.completed;
  res.json(todo);
});

// Delete todo
app.delete("/todos/:id", (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.json({ message: "Todo deleted" });
});

// Start server
app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
