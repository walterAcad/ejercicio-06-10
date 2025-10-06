import React, { useState, useEffect } from "react";

const API_BASE_URL = "http://localhost:5000/api";

export default function ListaTareas() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modoDemo, setModoDemo] = useState(false);

  // Datos de demo para cuando no esté disponible el backend
  const tareasDemo = [
    { id: 1, title: "Ejemplo: Estudiar React", completed: false },
    { id: 2, title: "Ejemplo: Hacer ejercicio", completed: true },
    { id: 3, title: "Ejemplo: Leer un libro", completed: false },
  ];

  // Función asíncrona para cargar tareas desde la API
  const cargarTareas = async () => {
    try {
      setLoading(true);
      setError("");
      
      // Intentar conectar con el backend
      const response = await fetch(`${API_BASE_URL}/tasks`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setTareas(data);
      setModoDemo(false);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
      // Si falla, usar modo demo
      setModoDemo(true);
      setTareas(tareasDemo);
      setError("Modo demo: Backend no disponible. Usando datos de ejemplo.");
    } finally {
      setLoading(false);
    }
  };

  // Función asíncrona para agregar nueva tarea
  const agregarTarea = async () => {
    if (!nuevaTarea.trim()) {
      alert("Por favor, ingresa un título para la tarea");
      return;
    }

    if (modoDemo) {
      // Modo demo - simular agregar tarea
      const nuevaTareaDemo = {
        id: Date.now(),
        title: nuevaTarea.trim(),
        completed: false,
      };
      setTareas([...tareas, nuevaTareaDemo]);
      setNuevaTarea("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: nuevaTarea.trim(),
          completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const nuevaTareaCreada = await response.json();
      setTareas([...tareas, nuevaTareaCreada]);
      setNuevaTarea("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
      setError("Error al agregar la tarea.");
    } finally {
      setLoading(false);
    }
  };

  // Función asíncrona para alternar estado de completado
  const alternarCompletado = async (id, completedActual) => {
    if (modoDemo) {
      // Modo demo - simular cambio de estado
      setTareas(tareas.map(tarea => 
        tarea.id === id ? { ...tarea, completed: !completedActual } : tarea
      ));
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !completedActual,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const tareaActualizada = await response.json();
      setTareas(tareas.map(tarea => 
        tarea.id === id ? tareaActualizada : tarea
      ));
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      setError("Error al actualizar la tarea.");
    } finally {
      setLoading(false);
    }
  };

  // Función asíncrona para eliminar tarea
  const eliminarTarea = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
      return;
    }

    if (modoDemo) {
      // Modo demo - simular eliminación
      setTareas(tareas.filter(tarea => tarea.id !== id));
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      setTareas(tareas.filter(tarea => tarea.id !== id));
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      setError("Error al eliminar la tarea.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar tareas al montar el componente
  useEffect(() => {
    cargarTareas();
  }, []);

  // Manejar envío del formulario
  const manejarEnvio = (e) => {
    e.preventDefault();
    agregarTarea();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h2>Lista de Tareas</h2>
      
      {/* Indicador de modo demo */}
      {modoDemo && (
        <div style={{
          backgroundColor: "#fff3cd",
          color: "#856404",
          padding: "10px",
          borderRadius: "4px",
          marginBottom: "20px",
          border: "1px solid #ffeaa7",
          textAlign: "center"
        }}>
          🚀 <strong>Modo Demo:</strong> Backend no disponible. Los cambios son temporales.
        </div>
      )}
      
      {/* Formulario para agregar nueva tarea */}
      <form onSubmit={manejarEnvio} style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            type="text"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Ingresa una nueva tarea..."
            disabled={loading}
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          />
          <button
            type="submit"
            disabled={loading || !nuevaTarea.trim()}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "16px",
              opacity: loading || !nuevaTarea.trim() ? 0.6 : 1
            }}
          >
            {loading ? "Agregando..." : "Agregar"}
          </button>
        </div>
      </form>

      {/* Mostrar errores */}
      {error && (
        <div style={{
          backgroundColor: modoDemo ? "#d1ecf1" : "#f8d7da",
          color: modoDemo ? "#0c5460" : "#721c24",
          padding: "10px",
          borderRadius: "4px",
          marginBottom: "20px",
          border: `1px solid ${modoDemo ? "#bee5eb" : "#f5c6cb"}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span>{error}</span>
          {modoDemo && (
            <button
              onClick={cargarTareas}
              style={{
                padding: "5px 10px",
                backgroundColor: "#17a2b8",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px"
              }}
            >
              Reintentar conexión
            </button>
          )}
        </div>
      )}

      {/* Indicador de carga */}
      {loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          Cargando...
        </div>
      )}

      {/* Lista de tareas */}
      {tareas.length === 0 && !loading ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          No hay tareas. ¡Agrega una nueva tarea para comenzar!
        </p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "15px",
                margin: "10px 0",
                backgroundColor: "#f8f9fa",
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                gap: "10px"
              }}
            >
              {/* Checkbox para alternar completado */}
              <input
                type="checkbox"
                checked={tarea.completed}
                onChange={() => alternarCompletado(tarea.id, tarea.completed)}
                disabled={loading}
                style={{ cursor: "pointer" }}
              />
              
              {/* Título de la tarea */}
              <span
                style={{
                  flex: 1,
                  textDecoration: tarea.completed ? "line-through" : "none",
                  color: tarea.completed ? "#6c757d" : "#212529",
                  fontSize: "16px"
                }}
              >
                {tarea.title}
              </span>
              
              {/* Indicador visual de estado */}
              <span style={{ fontSize: "20px" }}>
                {tarea.completed ? "✅" : "⏳"}
              </span>
              
              {/* Botón eliminar */}
              <button
                onClick={() => eliminarTarea(tarea.id)}
                disabled={loading}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  opacity: loading ? 0.6 : 1
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      
      {/* Estadísticas */}
      {tareas.length > 0 && (
        <div style={{
          marginTop: "20px",
          padding: "15px",
          backgroundColor: "#e9ecef",
          borderRadius: "8px",
          textAlign: "center"
        }}>
          <p style={{ margin: 0, color: "#495057" }}>
            Total: {tareas.length} | 
            Completadas: {tareas.filter(t => t.completed).length} | 
            Pendientes: {tareas.filter(t => !t.completed).length}
          </p>
        </div>
      )}
    </div>
  );
}