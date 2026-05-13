import { useState } from 'react';
import { QrCode, ShieldCheck, Search, Award, MapPin, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const QRModule = () => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);

    // Simulación de búsqueda en la BD (Offline para tu entrega)
    setTimeout(() => {
      setResult({
        id: "RP-2026-X882",
        name: "Cántaro de Barro Brunido",
        artisan: "Familia Martínez",
        origin: "Los Reyes Metzontla, Puebla",
        date: "10 de Mayo, 2026",
        material: "Barro natural, técnica de bruñido a mano",
        isOriginal: true
      });
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="bg-raices-green/10 w-20 h-20 rounded-3xl flex items-center justify-center text-raices-green mx-auto mb-6">
          <QrCode size={40} />
        </div>
        <h2 className="font-serif text-4xl text-raices-brown font-bold italic">Validador de Autenticidad</h2>
        <p className="text-slate-500 mt-2 font-medium">Escanea o ingresa el código único de tu pieza artesanal.</p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 mb-10">
        <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Ej: RP-2026-X882"
              className="w-full pl-12 pr-6 py-5 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-green transition-all font-mono"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-raices-green text-black px-10 py-5 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg flex items-center justify-center gap-2"
            disabled={isVerifying}
          >
            {isVerifying ? "Verificando..." : "Verificar Pieza"}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FDFBF7] border-2 border-raices-green rounded-[3rem] p-10 relative overflow-hidden shadow-inner"
          >
            {/* Sello de Garantía Visual */}
            <div className="absolute -top-4 -right-4 bg-raices-green text-white p-10 rounded-full rotate-12 flex flex-col items-center">
              <ShieldCheck size={32} />
              <span className="text-[10px] font-black uppercase tracking-tighter">Original</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-raices-green font-black uppercase tracking-widest text-xs mb-4">Certificado Digital</h3>
                <h4 className="font-serif text-3xl text-raices-brown font-bold mb-6">{result.name}</h4>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-600">
                    <User size={18} className="text-raices-accent" />
                    <span className="font-medium">Artesano: <b className="text-raices-brown">{result.artisan}</b></span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <MapPin size={18} className="text-raices-accent" />
                    <span className="font-medium">Origen: <b className="text-raices-brown">{result.origin}</b></span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Award size={18} className="text-raices-accent" />
                    <span className="font-medium">Técnica: <b className="text-raices-brown">{result.material}</b></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center bg-white rounded-3xl p-6 border border-raices-green/20">
                <div className="bg-slate-50 p-4 rounded-2xl mb-4">
                  <QrCode size={120} className="text-raices-brown opacity-20" />
                </div>
                <p className="font-mono text-xs text-slate-400">ID: {result.id}</p>
                <p className="text-[10px] font-bold text-raices-green mt-2 uppercase">Validado por Raíces Poblanas</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRModule;