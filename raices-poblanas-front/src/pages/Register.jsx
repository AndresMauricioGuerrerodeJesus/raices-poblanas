import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Brush, ShoppingBag } from 'lucide-react';
import { register } from '../api/auth';

const Register = () => {
  const [role, setRole] = useState('CUSTOMER'); // Por defecto Cliente
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', bio: '', municipality: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ ...formData, role });
      alert('¡Cuenta creada con éxito! Ahora inicia sesión.');
      navigate('/login');
    } catch (err) {
      alert('Error al registrar. Intenta con otro correo o usuario.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-raices-brown/5">
        
        <h2 className="font-serif text-3xl text-raices-brown text-center mb-2">Únete a la Raíz</h2>
        <p className="text-slate-500 text-center mb-8">Selecciona cómo quieres participar</p>

        {/* Selector de Rol Estilizado */}
        <div className="flex gap-4 mb-8">
          <button 
            type="button"
            onClick={() => setRole('CUSTOMER')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === 'CUSTOMER' ? 'border-raices-green bg-raices-green/5 text-raices-green' : 'border-slate-100 text-slate-400'}`}
          >
            <ShoppingBag size={24} />
            <span className="font-bold text-sm">Soy Cliente</span>
          </button>
          <button 
            type="button"
            onClick={() => setRole('ARTISAN')}
            className={`flex-1 p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === 'ARTISAN' ? 'border-raices-accent bg-raices-accent/5 text-raices-accent' : 'border-slate-100 text-slate-400'}`}
          >
            <Brush size={24} />
            <span className="font-bold text-sm">Soy Artesano</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" placeholder="Nombre de usuario" required
            className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-raices-green"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input 
            type="email" placeholder="Correo electrónico" required
            className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-raices-green"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" placeholder="Contraseña" required
            className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-raices-green"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          {/* SECCIÓN DINÁMICA PARA ARTESANOS */}
          <AnimatePresence>
            {role === 'ARTISAN' && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-4 pt-2"
              >
                <div className="h-px bg-slate-100 w-full my-2" />
                <p className="text-xs font-bold text-raices-accent uppercase tracking-widest">Información del Taller</p>
                <select 
                  required
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-raices-accent"
                  onChange={(e) => setFormData({...formData, municipality: e.target.value})}
                >
                  <option value="">¿En qué municipio estás?</option>
                  <option value="Teziutlán">Teziutlán</option>
                  <option value="Cuetzalan">Cuetzalan</option>
                  <option value="Tlatlauquitepec">Tlatlauquitepec</option>
                  <option value="Chignahuapan">Chignahuapan</option>
                </select>
                <textarea 
                  placeholder="Cuéntanos tu historia (Biografía)..."
                  required
                  className="w-full px-5 py-3 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-raices-accent h-32"
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                ></textarea>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            type="submit"
            className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all active:scale-95 ${role === 'ARTISAN' ? 'bg-raices-accent hover:bg-amber-600 shadow-amber-200' : 'bg-raices-green hover:bg-green-700 shadow-green-200'}`}
          >
            Crear mi cuenta
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;