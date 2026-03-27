export default function InventoryTable() {
  // Datos de prueba
  const equipos = [
    { id: 'GOB-001', tipo: 'PC de Escritorio', departamento: 'Recursos Humanos', estado: 'Activo' },
    { id: 'GOB-002', tipo: 'Impresora Multifuncional', departamento: 'Administración', estado: 'En Reparación' },
    { id: 'GOB-003', tipo: 'Servidor Rack', departamento: 'Site Principal', estado: 'Activo' },
    { id: 'GOB-004', tipo: 'Laptop ThinkPad', departamento: 'Despacho', estado: 'Dañado' },
    { id: 'GOB-005', tipo: 'Teléfono IP', departamento: 'Atención al Ciudadano', estado: 'Activo' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Cabecera de la tabla */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-aragua-gray">Equipos Registrados</h3>
        {/* Botón con el Rojo Coral de Aragua */}
        <button className="bg-aragua-red text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-aragua-red/90 transition-colors">
          + Nuevo Equipo
        </button>
      </div>

      {/* Contenedor con scroll horizontal */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-aragua-gray font-medium">
            <tr>
              <th className="px-6 py-3">Código / Serial</th>
              <th className="px-6 py-3">Tipo de Equipo</th>
              <th className="px-6 py-3">Departamento</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {equipos.map((equipo) => (
              <tr key={equipo.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-aragua-gray">{equipo.id}</td>
                <td className="px-6 py-4">{equipo.tipo}</td>
                <td className="px-6 py-4">{equipo.departamento}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${equipo.estado === 'Activo' ? 'bg-green-100 text-green-700' : ''}
                    ${equipo.estado === 'En Reparación' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${equipo.estado === 'Dañado' ? 'bg-red-100 text-red-700' : ''}
                  `}>
                    {equipo.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {/* Enlaces de acción con Azul Aragua y Rojo Aragua */}
                  <button className="text-aragua-blue hover:text-aragua-blue/80 mr-3 font-medium">Editar</button>
                  <button className="text-aragua-red hover:text-aragua-red/80 font-medium">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}