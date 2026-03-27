import isotipoAragua from '../assets/isotipo-aragua.png' 

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white text-gray-700 shadow-lg flex flex-col border-r border-gray-200 z-20">
      
      {/* Cabecera del Menú con el Logo completo */}
      {/* Ajustamos el tamaño de la imagen (w-40) para que se lea bien el texto */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-center flex-col">
        <img src={isotipoAragua} alt="Gobierno de Aragua" className="w-40 object-contain drop-shadow-sm" />
      </div>

      {/* Lista de Enlaces */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {/* Este primer enlace simula estar "activo" con un fondo azul clarito */}
        <a href="#" className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 text-aragua-blue bg-blue-50 font-semibold">
          <span className="text-xl">📊</span>
          <span>Dashboard</span>
        </a>
        
        {/* El resto de los enlaces son grises y se ponen azules al pasar el ratón */}
        <a href="#" className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-50 hover:text-aragua-blue">
          <span className="text-xl">🌐</span>
          <span className="font-medium">Redes</span>
        </a>
        
        <a href="#" className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-50 hover:text-aragua-blue">
          <span className="text-xl">🛠️</span>
          <span className="font-medium">Soporte Técnico</span>
        </a>
        
        <a href="#" className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-50 hover:text-aragua-blue">
          <span className="text-xl">💻</span>
          <span className="font-medium">Desarrollo</span>
        </a>
        
        <a href="#" className="flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-50 hover:text-aragua-blue">
          <span className="text-xl">📁</span>
          <span className="font-medium">Administración</span>
        </a>
      </nav>

      {/* Sección inferior */}
      <div className="p-4 border-t border-gray-100 text-sm text-center text-gray-500 bg-gray-50">
        <p>Usuario: Naidy Rojas</p>
      </div>
      
    </aside>
  )
}