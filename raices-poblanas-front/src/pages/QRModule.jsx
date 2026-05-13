import { useState } from 'react';
import { QrCode, ShieldCheck, Search, Award, MapPin, User, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QRModule = () => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setResult(null);
    setError(null);

    try {
      // Llamada real a tu endpoint de verificación
      const response = await fetch(`http://localhost:8080/api/products/verify/${code}`);

      if (response.ok) {
        const product = await response.json();
        setResult(product);
      } else {
        // Si el UUID no existe o el formato es incorrecto
        setError("Esta pieza no está registrada en nuestro sistema de autenticidad.");
      }
    } catch (err) {
      setError("Error de conexión. Asegúrate de que el servidor esté encendido.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="bg-raices-green/10 w-20 h-20 rounded-3xl flex items-center justify-center text-raices-green mx-auto mb-6">
          <QrCode size={40} />
        </div>
        <h2 className="font-serif text-4xl text-raices-brown font-bold italic">Validador de Autenticidad</h2>
        <p className="text-slate-500 mt-2 font-medium">Verifica el código único (UUID) de tu artesanía poblana.</p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 mb-10">
        <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Pega el UUID aquí..."
              className="w-full pl-12 pr-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-green transition-all font-mono text-sm"
              value={code}
              onChange={(e) => setCode(e.target.value.trim())}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-[#5D4037] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#4E342E] transition-all shadow-lg flex items-center justify-center gap-2"
            disabled={isVerifying}
          >
            {isVerifying ? "Consultando..." : "Verificar Pieza"}
          </button>
        </form>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-50 border border-red-100 p-6 rounded-3xl flex items-center gap-4 text-red-700 mb-10">
          <AlertTriangle size={24} />
          <p className="font-bold">{error}</p>
        </motion.div>
      )}

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#FDFBF7] border-2 border-raices-green rounded-[3rem] p-10 relative overflow-hidden shadow-inner"
          >
            <div className="absolute -top-4 -right-4 bg-raices-green text-white p-10 rounded-full rotate-12 flex flex-col items-center">
              <ShieldCheck size={32} />
              <span className="text-[10px] font-black uppercase tracking-tighter">Original</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-raices-green font-black uppercase tracking-widest text-xs mb-4">Certificado Digital de Origen</h3>
                <h4 className="font-serif text-3xl text-raices-brown font-bold mb-6">{result.name}</h4>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <User size={18} className="text-raices-accent" />
                    <span className="font-medium">Maestro Artesano: <b className="text-raices-brown">{result.artisan?.user?.username || 'Artesano Local'}</b></span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin size={18} className="text-raices-accent" />
                    <span className="font-medium">Comunidad: <b className="text-raices-brown">{result.artisan?.municipality || 'Sierra Norte'}</b></span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Award size={18} className="text-raices-accent" />
                    <span className="font-medium">Técnica/Material: <b className="text-raices-brown">{result.materials}</b></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center bg-white rounded-3xl p-6 border border-raices-green/20">
                <div className="bg-slate-50 p-6 rounded-2xl mb-4">
                  <QrCode size={100} className="text-raices-green" />
                </div>
                <p className="font-mono text-[9px] text-slate-400 break-all text-center px-4">ID: {result.uniquePieceId}</p>
                <p className="text-[10px] font-black text-raices-green mt-4 uppercase tracking-[0.2em]">Autenticidad Protegida</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRModule;