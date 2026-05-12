import { useState, useEffect } from 'react';
import { PackagePlus, Pencil, Trash2, QrCode, X, Save } from 'lucide-react';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Estado del formulario (Coincide con tu modelo Java Product)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    materials: '',
    stockQuantity: 1, // Por defecto 1 para piezas únicas
    category: { categoryId: 1 }, // Valor inicial temporal
    status: 'Available'
  });

  // Cargar productos del artesano al iniciar
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      // Ajusta la URL si tu artisanId es diferente del userId
      const response = await fetch(`http://localhost:8080/api/products/my-products/${user.id || 1}`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error cargando productos:", err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingProduct
      ? `http://localhost:8080/api/products/update/${editingProduct.productId}`
      : 'http://localhost:8080/api/products/add';

    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(editingProduct ? "Producto actualizado" : "¡Producto creado con éxito!");
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts(); // Recargar lista
      }
    } catch (err) {
      alert("Error al guardar el producto");
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("¿Seguro que quieres eliminar esta pieza?")) {
      await fetch(`http://localhost:8080/api/products/delete/${id}`, { method: 'DELETE' });
      fetchProducts();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="font-serif text-4xl text-raices-brown font-bold text-[#5D4037]">Mi Inventario</h2>
          <p className="text-slate-500">Gestiona tus piezas únicas y genera su certificado de autenticidad.</p>
        </div>
        <button
          onClick={() => { setEditingProduct(null); setShowForm(true); }}
          className="bg-[#2E7D32] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-800 transition-all shadow-lg"
        >
          <PackagePlus size={20} /> Registrar Nueva Pieza
        </button>
      </div>

      {/* MODAL DEL FORMULARIO (Se activa al dar click en Registrar o Editar) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-2xl font-bold text-raices-brown">
                {editingProduct ? 'Editar Artesanía' : 'Nueva Ficha de Producto'}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-red-500"><X /></button>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Nombre de la Obra</label>
                <input
                  type="text" required
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-green"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Precio ($ MXN)</label>
                <input
                  type="number" required
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-green"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">URL de la Imagen</label>
                <input
                  type="text"
                  placeholder="https://ejemplo.com/foto-artesania.jpg"
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-green"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Materiales</label>
                <input
                  type="text" placeholder="Ej. Barro negro, Lana"
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-green"
                  value={formData.materials}
                  onChange={(e) => setFormData({...formData, materials: e.target.value})}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Descripción e Historia</label>
                <textarea
                  rows="3"
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-green"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <button type="submit" className="md:col-span-2 bg-[#5D4037] text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-[#4E342E] transition-all shadow-xl">
                <Save size={20} /> {editingProduct ? 'Guardar Cambios' : 'Publicar en Catálogo'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TABLA DE PRODUCTOS (Igual a la que tenías pero conectada) */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Producto</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Precio</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black">Stock</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] text-slate-400 font-black text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(p => (
              <tr key={p.productId} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-raices-light rounded-lg flex items-center justify-center text-raices-brown font-bold text-xs uppercase">
                      {p.name.substring(0, 2)}
                    </div>
                    <div>
                      <p className="font-bold text-raices-brown leading-tight">{p.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{p.status}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono font-bold text-raices-green">${p.price}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-600">{p.stockQuantity} pz</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => { setEditingProduct(p); setFormData(p); setShowForm(true); }} className="p-2 text-slate-300 hover:text-raices-accent transition-colors"><Pencil size={18}/></button>
                    <button onClick={() => handleDelete(p.productId)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
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

export default ProductManagement;