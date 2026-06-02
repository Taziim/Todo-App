const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Temporary in-memory database
let todos = [];

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Add todo
app.post("/api/todos", (req, res) => {
  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ message: "Task is required" });
  }

  const newTodo = {
    id: Date.now(),
    task,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);

  todos = todos.filter((todo) => todo.id !== id);

  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});