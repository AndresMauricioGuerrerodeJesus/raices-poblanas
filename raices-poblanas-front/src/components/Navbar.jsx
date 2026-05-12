import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, ShoppingCart, User, QrCode, LogOut, 
  LayoutDashboard, PackagePlus, Store, History, Wallet,
  Brush, Sparkles, Info, BookOpen
} from 'lucide-react';
import logo from '../assets/logo-raices.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-raices-brown/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* LOGO (Siempre a la izquierda) */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img src={logo} alt="Logo" className="h-10 w-auto group-hover:scale-105 transition-transform" />
              <div className="hidden sm:block">
                <p className="font-serif text-lg font-bold text-raices-brown leading-none">Raíces Poblanas</p>
                <p className="text-[10px] uppercase text-raices-green font-bold tracking-tighter">Sierra Norte de Puebla</p>
              </div>
            </Link>
          </div>

          {/* LINKS PÚBLICOS (Inicio, Historia, Tienda) */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-slate-600 hover:text-raices-green font-medium transition-colors">Inicio</Link>
            <Link to="/historia" className="text-slate-600 hover:text-raices-green font-medium transition-colors">Nuestra Historia</Link>
            <Link to="/tienda" className="flex items-center gap-1 text-slate-600 hover:text-raices-green font-medium transition-colors">
              <Store size={18} /> Tienda
            </Link>

            {/* LINKS POR ROL (Solo aparecen si está logueado) */}
            {user?.role === 'ROLE_ARTISAN' && (
              <div className="flex items-center gap-4 border-l pl-4 border-slate-200">
                <Link to="/dashboard" className="flex items-center gap-1 text-raices-brown font-bold hover:text-raices-green transition-all">
                  <LayoutDashboard size={18} /> Mi Panel
                </Link>
                <Link to="/gestionar-catalogo" className="flex items-center gap-1 text-slate-600 hover:text-raices-green font-medium">
                  <PackagePlus size={18} /> Mi Catálogo
                </Link>
              </div>
            )}

            {user?.role === 'ROLE_CUSTOMER' && (
              <div className="flex items-center gap-4 border-l pl-4 border-slate-200">
                <Link to="/mis-compras" className="flex items-center gap-1 text-slate-600 hover:text-raices-green font-medium">
                  <History size={18} /> Mis Pedidos
                </Link>
                <Link to="/billetera" className="flex items-center gap-1 text-raices-green font-bold bg-green-50 px-3 py-1 rounded-lg">
                  <Wallet size={18} /> ${user.walletBalance || '0.00'}
                </Link>
              </div>
            )}

            {/* BOTÓN QR (Siempre visible - Propuesta de valor) */}
            <Link to="/comprobador" className="flex items-center gap-1 bg-raices-accent/10 text-raices-brown px-3 py-1.5 rounded-full hover:bg-raices-accent/20 transition-all font-semibold">
              <QrCode size={18} /> Validar QR
            </Link>

            {/* USUARIO / LOGIN */}
            <div className="flex items-center gap-4 border-l pl-4 border-slate-200">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-raices-brown">{user.username}</span>
                  <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-raices-brown text-white px-6 py-2.5 rounded-xl font-bold text-sm">
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>

          {/* Botón Mobile */}
          <div className="md:hidden flex items-center">
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