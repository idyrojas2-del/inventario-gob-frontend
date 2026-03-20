import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar' // <-- Importamos la nueva barra

function App() {
  return (
    <div className="flex h-screen bg-gob-gray overflow-hidden">
      {/* Menú lateral izquierdo */}
      <Sidebar />
      
      {/* Contenedor derecho (Todo lo que no es el menú) */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Barra superior */}
        <Navbar />
        
        {/* Contenido principal desplazable (Scroll) */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ¡El esqueleto está listo! 🎉
            </h2>
            <p className="text-gray-500">
              Aquí abajo irán las gráficas de equipos, la tabla de inventario y los reportes.
            </p>
          </div>
        </main>

      </div>
    </div>
  )
}

export default App