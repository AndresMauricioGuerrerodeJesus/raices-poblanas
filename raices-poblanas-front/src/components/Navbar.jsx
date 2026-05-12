import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, QrCode, LogOut, Sparkles } from 'lucide-react';
import logo from '../assets/logo-raices.png'; // Asegúrate de que el nombre coincida con tu archivo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 1. Efecto para revisar si hay una sesión activa al cargar
  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // 2. Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
    window.location.reload(); // Refresca para limpiar estados globales
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-raices-brown/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          
          {/* Logo con Isologo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Raíces Poblanas" 
                className="h-12 w-auto group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-raices-brown leading-none">
                  Raíces <span className="text-raices-green">Poblanas</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-raices-accent font-bold">Sierra Norte</span>
              </div>
            </Link>
          </div>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-600 hover:text-raices-green font-medium transition-colors">Inicio</Link>
            <Link to="/tienda" className="text-slate-600 hover:text-raices-green font-medium transition-colors">Tienda</Link>
            <Link to="/comprobador" className="flex items-center gap-1 bg-raices-accent/10 text-raices-brown px-3 py-1.5 rounded-full hover:bg-raices-accent/20 transition-all font-semibold">
              <QrCode size={18} /> Validar QR
            </Link>
            
            <div className="flex items-center space-x-4 border-l pl-8 border-slate-200">
              <Link to="/carrito" className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
                <ShoppingCart size={22} />
                <span className="absolute top-0 right-0 bg-raices-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
              </Link>

              {/* 3. Lógica Condicional del Botón de Usuario */}
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-raices-light px-3 py-2 rounded-xl border border-raices-brown/10">
                    <div className="w-8 h-8 bg-raices-green rounded-full flex items-center justify-center text-white font-bold text-sm uppercase">
                      {user.username.charAt(0)}
                    </div>
                    <span className="text-sm font-bold text-raices-brown">Hola, {user.username}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                    title="Cerrar Sesión"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="flex items-center gap-2 bg-raices-brown text-black px-5 py-2.5 rounded-xl hover:bg-raices-brown/90 transition-all shadow-md active:scale-95 font-bold">
                  <User size={18} /> Iniciar Sesión
                </Link>
              )}
            </div>
          </div>

          {/* Botón Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-raices-brown p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4">
          <Link to="/" className="block text-slate-600 font-medium">Inicio</Link>
          <Link to="/tienda" className="block text-slate-600 font-medium">Tienda</Link>
          <Link to="/comprobador" className="block text-raices-green font-bold italic">Validar QR</Link>
          <hr />
          {user ? (
            <div className="flex justify-between items-center">
              <span className="font-bold text-raices-brown">Cuenta: {user.username}</span>
              <button onClick={handleLogout} className="text-red-500 font-bold flex items-center gap-1">
                Salir <LogOut size={16}/>
              </button>
            </div>
          ) : (
            <Link to="/login" className="block bg-raices-brown text-white text-center py-3 rounded-xl font-bold">
              Iniciar Sesión
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;