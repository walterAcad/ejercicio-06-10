const express = require("express");
const taskRouter = express.Router();

taskRouter.get("/api/tasks", (req, res) => {
  res.json(task);
});

taskRouter.post("/api/tasks/:id", (req, res) => {
  res.status(201).json({ message: "Tarea creada" });
});

productosRouter.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const producto = productos.find((p) => p.id === id);
  if (!producto) {
    return res.status(404).json({ message: "Producto no encontrado." });
  }

  res.json(producto);
});

module.exports = taskRouter;
