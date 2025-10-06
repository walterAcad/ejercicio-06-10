const express = require("express");
const taskRouter = express.Router();

taskRouter.get("/api/tasks", (req, res) => {
  res.json(task);
});

taskRouter.post("/api/tasks/:id", (req, res) => {
  res.status(201).json({ message: "Tarea creada" });
});

module.exports = taskRouter;
