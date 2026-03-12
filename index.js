const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/auth.routes");
const todoRoutes = require("./src/routes/todo.routes");
const errorMiddleware = require("./src/middleware/error.middleware");

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
