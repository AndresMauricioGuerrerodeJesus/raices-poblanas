import { useState, useEffect } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // <--- IMPORTANTE

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // <--- DEBES DECLARARLO AQUÍ

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/products/catalog');
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (err) { console.error("Error al cargar catálogo", err); }
    };
    fetchCatalog();
  }, []);

  if (loading) return <div className="p-20 text-center font-serif text-2xl text-raices-brown italic">Cargando tesoros de la Sierra...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="font-serif text-5xl text-raices-brown font-bold italic">Nuestra Tienda</h2>
          <p className="text-slate-500 mt-2 font-medium">Artesanías 100% auténticas, enviadas desde el corazón de Puebla.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20}/>
          <input type="text" placeholder="Buscar por técnica o artesano..." className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm outline-none focus:border-raices-green" />
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.map(p => (
          <div
            key={p.productId}
            className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden group border border-slate-100 hover:border-raices-green transition-all hover:-translate-y-2 cursor-pointer"
            onClick={() => navigate(`/tienda/producto/${p.productId}`)} // <--- LA TARJETA COMPLETA ES CLICKABLE
          >
            <div className="h-72 overflow-hidden relative">
              <img
                src={p.imageUrl || "https://via.placeholder.com/400x300?text=Sin+Imagen"}
                alt={p.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-raices-brown shadow-sm">
                ${p.price} MXN
              </div>
            </div>

            <div className="p-8">
              <span className="text-[10px] uppercase font-black tracking-widest text-raices-green">
                {p.artisan?.user?.username || 'Artesano Local'}
              </span>
              <h3 className="font-serif text-2xl font-bold text-raices-brown mt-1 mb-3">{p.name}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-6">{p.description}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // <--- EVITA QUE EL CLIC EN EL BOTÓN ABRA LA FICHA TÉCNICA
                  console.log("Añadido al carrito");
                }}
                className="w-full bg-raices-light text-raices-brown py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-raices-green hover:text-white transition-all shadow-sm"
              >
                <ShoppingBag size={20} /> Añadir al Carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;