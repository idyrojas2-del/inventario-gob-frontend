export default function Navbar() {
    return (
      <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Panel Principal
          </h1>
        </div>
  
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-gob-blue transition-colors">
            🔔 Notificaciones
          </button>
          
          <div className="flex items-center gap-2 border-l pl-4 border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gob-blue text-white flex items-center justify-center font-bold">
              NR
            </div>
            <span className="font-medium text-gray-700">Naidy Rojas</span>
          </div>
        </div>
      </header>
    )
  }