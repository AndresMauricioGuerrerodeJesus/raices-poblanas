import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, ShieldCheck, MapPin, Tablet } from 'lucide-react'; // Cambié Tool por Tablet o puedes usar Settings
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Esto servirá para el fetch real después
  const [quantity, setQuantity] = useState(1);

  // Datos de ejemplo para tu presentación
  const product = {
    name: "Cántaro de Barro Bruñido",
    price: 450,
    artisan: "Maury",
    municipality: "Teziutlán, Puebla",
    materials: "Barro natural, técnica de bruñido a mano",
    description: "Esta pieza representa la tradición milenaria de la Sierra Norte. Cada trazo en el barro cuenta una historia de herencia familiar.",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=600"
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-raices-brown transition-colors mb-8 font-bold text-sm uppercase tracking-widest"
      >
        <ArrowLeft size={20} /> Volver a la Tienda
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-white">
          <img src={product.image} alt={product.name} className="w-full h-[600px] object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-raices-green mb-4">
            <MapPin size={18} />
            <span className="font-black text-xs uppercase tracking-tighter">{product.municipality}</span>
          </div>

          <h2 className="font-serif text-5xl text-raices-brown font-bold mb-4">{product.name}</h2>
          <p className="text-3xl font-black text-raices-green mb-8">${product.price} MXN</p>

          <div className="space-y-6 mb-10">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <h4 className="font-bold text-raices-brown mb-2 uppercase text-xs tracking-widest">Materiales y Técnica</h4>
              <p className="text-slate-600 leading-relaxed">{product.materials}</p>
            </div>
            <div>
              <h4 className="font-bold text-raices-brown mb-2 uppercase text-xs tracking-widest">Historia de la Pieza</h4>
              <p className="text-slate-500 leading-relaxed">{product.description}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center border-2 border-slate-100 rounded-2xl overflow-hidden bg-white">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-4 hover:bg-slate-50 text-xl">-</button>
              <span className="px-6 py-4 font-bold text-lg">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-6 py-4 hover:bg-slate-50 text-xl">+</button>
            </div>
            <button className="flex-1 w-full bg-[#5D4037] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#4E342E] shadow-xl">
              <ShoppingCart size={22} /> Añadir al Carrito
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4 p-4 border-t border-slate-100 text-slate-400">
            <ShieldCheck size={24} className="text-raices-green" />
            <p className="text-xs font-medium">Pieza con Certificado de Autenticidad Validado.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;