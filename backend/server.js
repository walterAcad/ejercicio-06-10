const express = require("express");
const cors = require("cors");
const puerto = process.env.PORT || 5000;
const taskRouter = require("./routes/taskRoutes");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api", taskRouter);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || "Error interno del servidor";
  console.error({ statusCode, message, stack: err.stack });
  res.status(statusCode).json({ 
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Iniciar servidor
app.listen(puerto, () => {
  console.log(`El servidor está corriendo en el puerto: ${puerto}`);
});
