import { TrendingUp, Package, ShoppingCart, DollarSign } from 'lucide-react';

const ArtisanDashboard = () => {
  const stats = [
    { label: 'Ventas Totales', value: '$12,450', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Pedidos Activos', value: '8', icon: ShoppingCart, color: 'bg-blue-100 text-blue-600' },
    { label: 'Productos en Catálogo', value: '24', icon: Package, color: 'bg-amber-100 text-amber-600' },
    { label: 'Crecimiento Mes', value: '+15%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto mt-16">
      <h1 className="text-3xl font-serif font-bold text-raices-brown mb-8">Panel de Control Artesanal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon size={24} />
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-raices-brown mb-4">Ventas Recientes</h2>
        <div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-slate-100">
          {/* Gráfico Mock */}
          {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
            <div key={i} style={{ height: `${h}%` }} className="w-full bg-raices-green/20 hover:bg-raices-green transition-colors rounded-t-lg"></div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-400 font-medium uppercase tracking-wider">
          <span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span><span>Vie</span><span>Sab</span><span>Dom</span>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDashboard;