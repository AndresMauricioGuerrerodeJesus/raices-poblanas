import { Save, UserCircle } from 'lucide-react';

const ArtisanProfile = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-raices-accent/20 p-4 rounded-2xl text-raices-accent"><UserCircle size={40}/></div>
          <h2 className="font-serif text-3xl font-bold text-raices-brown">Mi Biografía de Artesano</h2>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Mi Historia / Bio</label>
            <textarea className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-green" rows="5" placeholder="Cuéntale al mundo sobre tu técnica y tradición..."></textarea>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Municipio / Comunidad</label>
            <input type="text" className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-raices-green" placeholder="Ej. Cuetzalan del Progreso" />
          </div>
          <button className="w-full bg-raices-brown text-white py-4 rounded-2xl font-bold hover:bg-brown-800 shadow-xl transition-all flex justify-center items-center gap-2">
            <Save size={20} /> Guardar Perfil Público
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArtisanProfile;