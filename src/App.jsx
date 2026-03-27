import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import StatCard from './components/StatCard'
import InventoryTable from './components/InventoryTable'

function App() {
  return (
    <div className="flex h-screen bg-gob-gray overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard de Infraestructura TI</h2>

            {/* Grid (Cuadrícula) de Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard title="Total Equipos" value="1,248" icon="💻" colorClass="bg-gob-blue" />
              <StatCard title="Servidores Activos" value="12" icon="🗄️" colorClass="bg-status-active" />
              <StatCard title="Teléfonos" value="340" icon="☎️" colorClass="bg-purple-500" />
              <StatCard title="Equipos Dañados" value="23" icon="⚠️" colorClass="bg-status-broken" />
            </div>

            {/* Tabla de Inventario */}
            <InventoryTable />
            
          </div>
        </main>
      </div>
    </div>
  )
}

export default App