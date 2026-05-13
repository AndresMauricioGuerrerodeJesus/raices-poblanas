import { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, ShieldCheck, MapPin, Package } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importación vital

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart(); // Accedemos a la función del carrito
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`¡${quantity} ${product.name}(s) añadidos al carrito!`);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        }
      } catch (err) {
        console.error("Error al obtener el producto:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-20 text-center font-serif text-2xl text-raices-brown italic">Cargando pieza de la Sierra...</div>;
  if (!product) return <div className="p-20 text-center font-serif text-2xl text-raices-brown">Producto no encontrado.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-raices-brown transition-colors mb-8 font-bold text-sm uppercase tracking-widest">
        <ArrowLeft size={20} /> Volver a la Tienda
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-white">
          <img
            src={product.imageUrl || "https://via.placeholder.com/600x600?text=Sin+Imagen"}
            alt={product.name}
            className="w-full h-[600px] object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 text-raices-green mb-4">
            <MapPin size={18} />
            <span className="font-black text-xs uppercase tracking-tighter">
              {product.artisan?.municipality || "Sierra Norte, Puebla"}
            </span>
          </div>

          <h2 className="font-serif text-5xl text-raices-brown font-bold mb-4">{product.name}</h2>
          <p className="text-3xl font-black text-raices-green mb-8">${product.price} MXN</p>

          <div className="space-y-6 mb-10">
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
              <h4 className="font-bold text-raices-brown mb-2 uppercase text-xs tracking-widest flex items-center gap-2">
                <Package size={16}/> Materiales y Técnica
              </h4>
              <p className="text-slate-600 leading-relaxed">{product.materials || "Técnica artesanal tradicional poblana."}</p>
            </div>
            <div>
              <h4 className="font-bold text-raices-brown mb-2 uppercase text-xs tracking-widest italic">Historia de la Pieza</h4>
              <p className="text-slate-500 leading-relaxed">{product.description}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex items-center border-2 border-slate-100 rounded-2xl overflow-hidden bg-white">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-4 hover:bg-slate-50 text-xl font-bold">-</button>
              <span className="px-6 py-4 font-bold text-lg min-w-[60px] text-center">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-6 py-4 hover:bg-slate-50 text-xl font-bold">+</button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 w-full bg-[#5D4037] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-[#4E342E] shadow-xl shadow-brown-200 transition-all active:scale-95"
            >
              <ShoppingCart size={22} /> Añadir al Carrito
            </button>
          </div>

          <div className="mt-10 flex items-center gap-4 p-4 border-t border-slate-100 text-slate-400 font-medium">
            <ShieldCheck size={24} className="text-raices-green" />
            <p className="text-[10px] uppercase tracking-widest">Pieza con Certificado de Autenticidad por el artesano <b>{product.artisan?.user?.username || 'Local'}</b>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;