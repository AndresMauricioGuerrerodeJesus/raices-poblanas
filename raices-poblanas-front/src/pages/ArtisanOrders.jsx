import { Package, Truck, CheckCircle } from 'lucide-react';

const ArtisanOrders = () => {
  const orders = [
    { id: "ORD-9921", customer: "Carlos Slim", date: "12 May 2026", total: 2450, status: "Pendiente" },
    { id: "ORD-9918", customer: "Ana Guevara", date: "10 May 2026", total: 850, status: "Enviado" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="font-serif text-3xl text-raices-brown font-bold mb-8">Gestión de Pedidos</h2>
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Pedido</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Cliente</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Total</th>
              <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-6 py-4 font-bold text-raices-brown">{o.id}</td>
                <td className="px-6 py-4 text-slate-600">{o.customer}</td>
                <td className="px-6 py-4 font-bold text-raices-green">${o.total}</td>
                <td className="px-6 py-4">
                  <div className={`mx-auto w-32 py-1.5 rounded-full text-[10px] font-black uppercase text-center ${o.status === 'Pendiente' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                    {o.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArtisanOrders;