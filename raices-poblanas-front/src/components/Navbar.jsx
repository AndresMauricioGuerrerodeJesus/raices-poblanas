import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Importante para el contador
import {
  Menu, X, ShoppingCart, LogOut,
  LayoutDashboard, PackagePlus, Store, QrCode
} from 'lucide-react';
import logo from '../assets/logo-raices.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { getCartCount } = useCart(); // Obtenemos el número de productos
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-raices-brown/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">

          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <p className="font-serif text-lg font-bold text-raices-brown leading-none italic">Raíces Poblanas</p>
                <p className="text-[10px] uppercase text-raices-green font-black tracking-tighter">Sierra Norte de Puebla</p>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-raices-green font-bold text-sm uppercase tracking-widest transition-colors">Inicio</Link>
            <Link to="/tienda" className="flex items-center gap-2 text-slate-600 hover:text-raices-green font-bold text-sm uppercase tracking-widest transition-colors">
              <Store size={18} /> Tienda
            </Link>

            {/* RUTAS DE ARTESANO */}
            {(user?.role === 'ROLE_ARTISAN' || user?.role === 'ARTISAN') && (
              <div className="flex items-center gap-6 border-l pl-6 border-slate-100">
                <Link to="/artesano/dashboard" className="flex items-center gap-2 text-raices-brown font-black text-xs uppercase tracking-widest hover:text-raices-green transition-all">
                  <LayoutDashboard size={18} /> Mi Panel
                </Link>
                <Link to="/artesano/producto" className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-widest hover:text-raices-green transition-all">
                  <PackagePlus size={18} /> Publicar
                </Link>
              </div>
            )}

            <Link to="/comprobador" className="flex items-center gap-2 bg-raices-green/10 text-raices-green px-4 py-2 rounded-full hover:bg-raices-green hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest">
              <QrCode size={16} /> Validar QR
            </Link>

            {/* ICONO DEL CARRITO CON CONTADOR */}
            <Link to="/carrito" className="relative p-2 text-raices-brown hover:scale-110 transition-transform">
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 bg-raices-green text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <div className="flex items-center gap-4 border-l pl-6 border-slate-100">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase text-raices-brown bg-slate-50 px-3 py-1 rounded-lg italic">@{user.username}</span>
                  <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-[#5D4037] text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#4E342E] transition-all shadow-md">
                  Ingresar
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/carrito" className="relative p-2 text-raices-brown">
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 bg-raices-green text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-raices-brown">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;