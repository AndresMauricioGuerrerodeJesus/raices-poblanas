import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { login } from '../api/auth'; // Asegúrate de tener este archivo creado

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
      setError('Acceso denegado. Verifica tus credenciales de artesano.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-3xl shadow-2xl border border-raices-brown/5 max-w-md w-full"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-raices-green/10 p-4 rounded-full mb-4">
            <LogIn className="text-raices-green" size={32} />
          </div>
          <h2 className="font-serif text-3xl text-raices-brown font-bold">Bienvenido</h2>
          <p className="text-slate-500 text-sm mt-2">Accede a tu cuenta de Raíces Poblanas</p>
        </div>
        
        {error && <p className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-xs text-center font-bold border border-red-100">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 ml-1">Usuario</label>
            <input 
              type="text" 
              placeholder="Ej. maury_artesano"
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-raices-green outline-none transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 ml-1">Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-raices-green outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-raices-brown text-white py-5 rounded-2xl font-bold hover:bg-raices-brown/90 transition-all shadow-xl shadow-raices-brown/20 active:scale-95"
          >
            Iniciar Sesión
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;