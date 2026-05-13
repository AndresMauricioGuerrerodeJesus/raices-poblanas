import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <ShoppingBag size={64} className="text-slate-200" />
        <h2 className="font-serif text-2xl text-raices-brown italic">Tu morral está vacío</h2>
        <button onClick={() => navigate('/tienda')} className="text-raices-green font-bold hover:underline">
          Volver a la tienda para buscar tesoros
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="font-serif text-4xl text-raices-brown font-bold mb-8 italic">Mi Carrito</h2>

      <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 space-y-6">
          {cart.map((item) => (
            <div key={item.productId} className="flex items-center gap-6 py-4 border-b border-slate-50 last:border-0">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-2xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-raices-brown">{item.name}</h3>
                <p className="text-slate-400 text-sm">Cantidad: {item.quantity}</p>
              </div>
              <p className="font-black text-raices-green">${item.price * item.quantity} MXN</p>
              <button onClick={() => removeFromCart(item.productId)} className="text-slate-300 hover:text-red-500 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-slate-500 text-xs uppercase font-black tracking-widest">Total a pagar</p>
            <p className="text-3xl font-black text-raices-brown">${getCartTotal()} MXN</p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button onClick={clearCart} className="px-6 py-4 text-slate-400 font-bold hover:text-raices-brown transition-colors">
              Vaciar
            </button>
            <button className="flex-1 sm:flex-none bg-raices-green text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-200 hover:bg-green-700 transition-all">
              Finalizar Compra <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;