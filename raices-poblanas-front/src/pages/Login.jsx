import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, UserPlus, Store } from 'lucide-react';
import { login } from '../api/auth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
      window.location.reload();
    } catch (err) {
      setError('Acceso denegado. Verifica tus credenciales.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-raices-light/30">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl border border-raices-brown/10 max-w-md w-full"
      >
        {/* Cabecera del Login */}
        <div className="flex flex-col items-center mb-10">
          <div className="bg-raices-brown/10 p-4 rounded-2xl mb-4 text-raices-brown">
            <LogIn size={32} />
          </div>
          <h2 className="font-serif text-3xl text-raices-brown font-bold text-center">Bienvenido de nuevo</h2>
          <p className="text-slate-500 text-sm mt-2">Ingresa a tu cuenta de Raíces Poblanas</p>
        </div>
        
        {error && (
          <p className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-xs text-center font-bold border border-red-100">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1">
              Nombre de Usuario
            </label>
            <input 
              type="text" 
              placeholder="Ej. maury_artesano"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-raices-green focus:ring-4 focus:ring-raices-green/5 outline-none transition-all text-slate-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1">
              Contraseña
            </label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-raices-green focus:ring-4 focus:ring-raices-green/5 outline-none transition-all text-slate-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* BOTÓN CORREGIDO: Café oscuro con texto blanco visible */}
          <button 
            type="submit"
            className="w-full bg-[#5D4037] text-white py-5 rounded-2xl font-bold hover:bg-[#4E342E] transition-all shadow-xl shadow-raices-brown/20 active:scale-[0.98] flex justify-center items-center gap-2"
          >
            <LogIn size={20} /> Iniciar Sesión
          </button>
        </form>

        {/* SECCIÓN DE REGISTRO RESTAURADA */}
        <div className="mt-10 pt-8 border-t border-slate-100">
          <p className="text-slate-400 text-[10px] uppercase tracking-widest text-center font-bold mb-6">
            ¿No tienes cuenta?
          </p>
          
          <div className="grid grid-cols-1 gap-3">
            <Link 
              to="/register" 
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl border-2 border-raices-green text-raices-green font-bold hover:bg-raices-green hover:text-white transition-all text-sm group"
            >
              <UserPlus size={18} className="group-hover:scale-110 transition-transform" />
              Registrarme como Cliente
            </Link>
            
            <Link 
              to="/register?role=ARTISAN" 
              className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl border-2 border-raices-accent text-raices-accent font-bold hover:bg-raices-accent hover:text-white transition-all text-sm group"
            >
              <Store size={18} className="group-hover:scale-110 transition-transform" />
              Unirme como Artesano
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;