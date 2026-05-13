import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brush, ShoppingBag, AlertCircle, Camera } from 'lucide-react';
import { register, login } from '../api/auth';

const Register = () => {
  const [role, setRole] = useState('CUSTOMER');
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', bio: '', municipality: '', profilePicture: '' // <--- AÑADIDO
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Función para convertir la imagen local a Base64
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profilePicture: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register({ ...formData, role });
      await login(formData.username, formData.password);

      if (role === 'ARTISAN') {
        alert('¡Cuenta creada! Revisa tu biografía y empieza a vender.');
        navigate('/artesano/perfil');
      } else {
        alert('¡Bienvenido a Raíces Poblanas!');
        navigate('/tienda');
      }
      window.location.reload();
    } catch (err) {
      setError('Error al registrar. El usuario o correo ya podrían existir.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-raices-light/20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-lg w-full border border-raices-brown/5">

        <h2 className="font-serif text-3xl text-raices-brown text-center font-bold mb-2">Únete a la Raíz</h2>
        <p className="text-slate-500 text-center mb-8 text-sm font-medium">Selecciona cómo quieres participar</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {/* Selector de Rol */}
        <div className="flex gap-4 mb-8">
          <button
            type="button"
            onClick={() => setRole('CUSTOMER')}
            className={`flex-1 p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === 'CUSTOMER' ? 'border-raices-green bg-raices-green/5 text-raices-green' : 'border-slate-50 text-slate-300'}`}
          >
            <ShoppingBag size={28} />
            <span className="font-black text-[10px] uppercase tracking-widest">Soy Cliente</span>
          </button>
          <button
            type="button"
            onClick={() => setRole('ARTISAN')}
            className={`flex-1 p-5 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${role === 'ARTISAN' ? 'border-raices-accent bg-raices-accent/5 text-raices-accent' : 'border-slate-50 text-slate-300'}`}
          >
            <Brush size={28} />
            <span className="font-black text-[10px] uppercase tracking-widest">Soy Artesano</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" placeholder="Nombre de usuario" required
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:bg-white focus:border-raices-green transition-all"
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input
            type="email" placeholder="Correo electrónico" required
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:bg-white focus:border-raices-green transition-all"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input
            type="password" placeholder="Contraseña segura" required
            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:bg-white focus:border-raices-green transition-all"
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />

          <AnimatePresence>
            {role === 'ARTISAN' && (
              <motion.div initial={{ height: 'auto', opacity: 1 }} className="space-y-4 pt-2">
                <div className="h-px bg-slate-100 w-full my-4" />

                {/* CAMPO DE IMAGEN AÑADIDO */}
                <div className="flex flex-col items-center gap-4 py-2">
                  <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border-2 border-dashed border-slate-200">
                    {formData.profilePicture ? (
                      <img src={formData.profilePicture} className="w-full h-full object-cover" />
                    ) : (
                      <Camera size={24} className="text-slate-300" />
                    )}
                  </div>
                  <label className="text-[10px] font-black text-raices-accent uppercase cursor-pointer hover:underline">
                    Cargar Foto de Perfil
                    <input type="file" accept="image/*" hidden onChange={handleImage} />
                  </label>
                </div>

                <select
                  required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-accent"
                  onChange={(e) => setFormData({...formData, municipality: e.target.value})}
                >
                  <option value="">¿En qué municipio estás?</option>
                  <option value="Teziutlán">Teziutlán</option>
                  <option value="Cuetzalan">Cuetzalan</option>
                  <option value="Tlatlauquitepec">Tlatlauquitepec</option>
                </select>
                <textarea
                  placeholder="Tu historia..." required
                  className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-accent h-24 resize-none"
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                ></textarea>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className={`w-full py-5 rounded-2xl font-bold text-white shadow-xl transition-all mt-6 ${role === 'ARTISAN' ? 'bg-raices-accent hover:bg-amber-600 shadow-raices-accent/20' : 'bg-raices-green hover:bg-green-700 shadow-raices-green/20'}`}
          >
            Crear mi cuenta
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;