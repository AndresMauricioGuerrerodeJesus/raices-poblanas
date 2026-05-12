import { Plus, Edit, Trash2, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManageCatalog = () => {
  const products = [
    { id: 1, name: 'Blusa Bordada Teziutlán', price: 850, category: 'Textiles', stock: 5 },
    { id: 2, name: 'Jarrón de Barro Negro', price: 420, category: 'Alfarería', stock: 12 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto mt-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-raices-brown">Mi Catálogo</h1>
        <Link to="/gestionar-producto" className="flex items-center gap-2 bg-raices-green text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
          <Plus size={20} /> Nuevo Producto
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
            <tr>
              <th className="p-4">Producto</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-800">{p.name}</td>
                <td className="p-4 text-slate-600">{p.category}</td>
                <td className="p-4 font-bold text-raices-green">${p.price}</td>
                <td className="p-4">{p.stock} pzas</td>
                <td className="p-4 flex justify-center gap-3">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={18} /></button>
                  <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg"><QrCode size={18} /></button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCatalog;