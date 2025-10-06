import React from "react";
import ListaTareas from "./components/ListaTareas";
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={{ 
        textAlign: "center", 
        padding: "20px 0", 
        backgroundColor: "#f8f9fa",
        marginBottom: "20px"
      }}>
        <h1 style={{ 
          color: "#343a40",
          margin: 0,
          fontSize: "2.5rem"
        }}>
          📝 Gestor de Tareas
        </h1>
        <p style={{ 
          color: "#6c757d",
          margin: "10px 0 0 0",
          fontSize: "1.1rem"
        }}>
          Organiza tus tareas de manera eficiente
        </p>
      </header>
      <main>
        <ListaTareas />
      </main>
    </div>
  );
}

export default App;
