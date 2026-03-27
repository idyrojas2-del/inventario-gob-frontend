export default function StatCard({ title, value, icon, colorClass }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4">
      {/* Círculo de color con el ícono */}
      <div className={`p-4 rounded-full ${colorClass} text-white text-2xl flex items-center justify-center w-14 h-14`}>
        {icon}
      </div>
      
      {/* Textos de la tarjeta */}
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  )
}