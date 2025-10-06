// Script de prueba para verificar que el backend funciona correctamente
const baseUrl = 'http://localhost:5000/api';

// Función para probar el backend
async function probarBackend() {
    console.log('🧪 Iniciando pruebas del backend...\n');
    
    try {
        // 1. Obtener todas las tareas
        console.log('1️⃣ Probando GET /api/tasks');
        const respuesta1 = await fetch(`${baseUrl}/tasks`);
        const tareas = await respuesta1.json();
        console.log('✅ Tareas obtenidas:', tareas.length, 'tareas');
        console.log('📋 Tareas:', tareas);
        
        // 2. Crear nueva tarea
        console.log('\n2️⃣ Probando POST /api/tasks');
        const respuesta2 = await fetch(`${baseUrl}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Tarea de prueba desde script', completed: false })
        });
        const nuevaTarea = await respuesta2.json();
        console.log('✅ Tarea creada:', nuevaTarea);
        
        // 3. Actualizar tarea
        console.log('\n3️⃣ Probando PUT /api/tasks/' + nuevaTarea.id);
        const respuesta3 = await fetch(`${baseUrl}/tasks/${nuevaTarea.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true })
        });
        const tareaActualizada = await respuesta3.json();
        console.log('✅ Tarea actualizada:', tareaActualizada);
        
        // 4. Eliminar tarea
        console.log('\n4️⃣ Probando DELETE /api/tasks/' + nuevaTarea.id);
        const respuesta4 = await fetch(`${baseUrl}/tasks/${nuevaTarea.id}`, {
            method: 'DELETE'
        });
        const resultado = await respuesta4.json();
        console.log('✅ Tarea eliminada:', resultado);
        
        console.log('\n🎉 ¡Todas las pruebas pasaron exitosamente!');
        
    } catch (error) {
        console.error('❌ Error en las pruebas:', error.message);
        console.log('💡 Asegúrate de que el backend esté corriendo en puerto 5000');
    }
}

// Ejecutar las pruebas si este archivo se ejecuta directamente
if (typeof window === 'undefined') {
    // Estamos en Node.js
    const fetch = require('node-fetch');
    probarBackend();
} else {
    // Estamos en el navegador
    console.log('📱 Para probar el backend, abre la consola del navegador y ejecuta: probarBackend()');
    window.probarBackend = probarBackend;
}