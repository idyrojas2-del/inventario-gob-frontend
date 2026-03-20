export default function Sidebar() {
    return (
      <aside className="w-64 h-screen bg-gob-blue text-white shadow-lg flex flex-col">
        {/* Título del Menú */}
        <div className="p-6 mb-4 border-b border-blue-800">
          <h2 className="text-2xl font-bold text-center">Gobierno TI 🏛️</h2>
        </div>
  
        {/* Lista de Enlaces */}
        <nav className="flex-1 px-4 space-y-2">
          <a href="#" className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-blue-800">
            <span className="text-xl">📊</span>
            <span className="font-medium">Dashboard</span>
          </a>
          
          <a href="#" className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-blue-800">
            <span className="text-xl">🌐</span>
            <span className="font-medium">Redes</span>
          </a>
          
          <a href="#" className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-blue-800">
            <span className="text-xl">🛠️</span>
            <span className="font-medium">Soporte Técnico</span>
          </a>
          
          <a href="#" className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-blue-800">
            <span className="text-xl">💻</span>
            <span className="font-medium">Desarrollo</span>
          </a>
          
          <a href="#" className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-blue-800">
            <span className="text-xl">📁</span>
            <span className="font-medium">Administración</span>
          </a>
        </nav>
  
        {/* Sección inferior para el usuario */}
        <div className="p-4 border-t border-blue-800 text-sm text-center text-blue-200">
          <p>Usuario: Administrador</p>
        </div>
      </aside>
    )
  }