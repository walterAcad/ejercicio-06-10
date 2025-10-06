import React, { useState, useEffect } from "react";
export default function ListaTareas() {
  
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");


  useEffect(() => {
    const cargarTareas = () => {
      setTareas([]);
    };

    cargarTareas();
  }, []);

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <ul>
        {tareas.map((tarea, indice) => (
          <li key={indice}>
            {tarea.title} {tarea.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}