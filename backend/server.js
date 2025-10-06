const express = require("express");
const cors = require("cors");
const puerto = process.env.PORT || 5000;
const taskRouter = require("./routes/taskRoutes");
const app = express();

app.use(express.json);
app.use(cors());

app.use("/api/task", taskRouter);

app.use((req, res, next) => {
  const error = new Error(`ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Error de servidor.";
  console.error({ statusCode, message, stack: err.stack });
  res.status(statusCode).json({ error: message });
});
app.listen(puerto, () => {
  console.log(`El servidor esta corriendo en el puerto: ${puerto}`);
});
