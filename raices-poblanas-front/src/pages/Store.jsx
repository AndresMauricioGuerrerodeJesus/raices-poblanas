import { ShoppingCart, Eye } from 'lucide-react';

const Store = () => {
  const mockProducts = [
    { id: 1, name: "Jarrón de Barro ", price: 450, artisan: "Pedro Juarez", img: "https://www.talaverasalazar.com/cdn/shop/files/IMG_4558_720x720.jpg?v=1701287557" },
    { id: 2, name: "Rebozo de Seda", price: 1200, artisan: "María Elena", img: "https://m.media-amazon.com/images/I/7132SCalaGL._AC_SX679_.jpg" },
    { id: 3, name: "Esferas", price: 850, artisan: "Juan Carlos", img: "https://tse4.mm.bing.net/th/id/OIP.tRI9Zu0IkC97eOpcw-sCXQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="font-serif text-4xl text-raices-brown font-bold mb-8">Catálogo</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {mockProducts.map(p => (
          <div key={p.id} className="bg-white rounded-3xl shadow-lg overflow-hidden group border border-slate-100 hover:border-raices-green transition-all">
            <img src={p.img} alt={p.name} className="w-full h-64 object-cover" />
            <div className="p-6">
              <p className="text-[10px] uppercase font-bold text-raices-green mb-1">{p.artisan}</p>
              <h3 className="font-serif text-xl font-bold text-raices-brown mb-2">{p.name}</h3>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-raices-brown">${p.price}</span>
                <button className="bg-raices-green text-white p-3 rounded-xl hover:bg-green-700 transition-colors">
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;