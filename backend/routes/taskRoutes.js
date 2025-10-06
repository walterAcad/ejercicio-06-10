const express = require("express");
const taskRouter = express.Router();

// Simulación de base de datos en memoria
let tasks = [
  { id: 1, title: "Tarea de ejemplo 1", completed: false },
  { id: 2, title: "Tarea de ejemplo 2", completed: true },
  { id: 3, title: "Tarea de ejemplo 3", completed: false }
];

let nextId = 4;

// GET /api/tasks - Obtener todas las tareas
taskRouter.get("/tasks", (req, res) => {
  try {
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
});

// POST /api/tasks - Crear nueva tarea
taskRouter.post("/tasks", (req, res) => {
  try {
    const { title, completed = false } = req.body;

    // Validación
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "El título de la tarea es requerido" });
    }

    // Crear nueva tarea
    const newTask = {
      id: nextId++,
      title: title.trim(),
      completed: Boolean(completed)
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
});

// PUT /api/tasks/:id - Actualizar tarea existente
taskRouter.put("/tasks/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;

    // Buscar la tarea
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    // Actualizar campos proporcionados
    if (title !== undefined) {
      if (title.trim() === "") {
        return res.status(400).json({ error: "El título no puede estar vacío" });
      }
      tasks[taskIndex].title = title.trim();
    }

    if (completed !== undefined) {
      tasks[taskIndex].completed = Boolean(completed);
    }

    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la tarea" });
  }
});

// DELETE /api/tasks/:id - Eliminar tarea
taskRouter.delete("/tasks/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);

    // Buscar la tarea
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    
    if (taskIndex === -1) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    // Eliminar la tarea
    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.status(200).json({ 
      message: "Tarea eliminada exitosamente",
      task: deletedTask
    });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
});

// GET /api/tasks/:id - Obtener tarea por ID (endpoint adicional útil)
taskRouter.get("/tasks/:id", (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tarea" });
  }
});

module.exports = taskRouter;
