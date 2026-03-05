const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./frontend/src/routes/auth.routes");
const todoRoutes = require("./frontend/src/routes/todo.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/todo_db")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
