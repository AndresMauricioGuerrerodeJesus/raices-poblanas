import { Save, ArrowLeft, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-3xl mx-auto mt-16">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 mb-6 hover:text-raices-brown transition-colors">
        <ArrowLeft size={20} /> Volver al catálogo
      </button>

      <div className="bg-white p-8 rounded-3xl shadow-xl border border-raices-brown/5">
        <h1 className="text-2xl font-serif font-bold text-raices-brown mb-8">Detalles del Producto</h1>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-slate-700 mb-2">Nombre de la pieza</label>
              <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-raices-green outline-none transition-all" placeholder="Ej. Rebozo de lana fina" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Precio (MXN)</label>
              <input type="number" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="0.00" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Categoría</label>
              <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                <option>Textiles</option>
                <option>Alfarería</option>
                <option>Madera</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Descripción e Historia</label>
            <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl h-32 outline-none" placeholder="Cuéntale al cliente el proceso y significado de esta pieza..."></textarea>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center hover:border-raices-green transition-colors cursor-pointer group">
            <Upload className="mx-auto mb-4 text-slate-300 group-hover:text-raices-green transition-colors" size={48} />
            <p className="text-slate-500 font-medium">Arrastra las fotos aquí o haz clic para subir</p>
            <p className="text-xs text-slate-400 mt-2">Máximo 3 fotos (Recomendado: 1080x1080px)</p>
          </div>

          <button className="w-full bg-raices-brown text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-raices-brown/20">
            <Save size={20} /> Guardar y Generar QR
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageProduct;
