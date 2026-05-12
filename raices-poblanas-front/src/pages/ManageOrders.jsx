import { CheckCircle2, Clock, Truck } from 'lucide-react';

const ManageOrders = () => {
  const orders = [
    { id: '#RP-9921', buyer: 'Juan Pérez', date: '12 May 2026', total: '$1,200', status: 'Pendiente', icon: Clock, color: 'text-amber-500' },
    { id: '#RP-9918', buyer: 'Maria García', date: '10 May 2026', total: '$850', status: 'Enviado', icon: Truck, color: 'text-blue-500' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto mt-16">
      <h1 className="text-3xl font-serif font-bold text-raices-brown mb-8">Gestión de Pedidos</h1>
      
      <div className="space-y-4">
        {orders.map((order, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 w-full">
              <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center font-bold text-raices-brown">{order.id}</div>
              <div>
                <h4 className="font-bold text-slate-800 text-lg">{order.buyer}</h4>
                <p className="text-slate-500 text-sm">{order.date} • {order.total}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8 w-full md:w-auto">
              <div className={`flex items-center gap-2 font-bold ${order.color}`}>
                <order.icon size={20} /> {order.status}
              </div>
              <button className="whitespace-nowrap bg-raices-brown text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-800 transition-colors">
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;