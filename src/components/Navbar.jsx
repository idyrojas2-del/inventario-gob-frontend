export default function Navbar() {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
      {/* Sección Izquierda */}
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-aragua-gray">
          Panel Principal
        </h1>
      </div>

      {/* Sección Derecha */}
      <div className="flex items-center gap-4">
        {/* Cambiamos el color de hover al Rojo Coral */}
        <button className="text-gray-500 hover:text-aragua-red transition-colors flex items-center gap-2 text-sm">
          <span>🔔 Notificaciones</span>
        </button>
        
        <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
          {/* Círculo de avatar con Azul Aragua */}
          <div className="w-8 h-8 rounded-full bg-aragua-blue text-white flex items-center justify-center font-bold text-sm">
            NR
          </div>
          <span className="font-medium text-aragua-gray text-sm">Admin</span>
        </div>
      </div>
    </header>
  )
}