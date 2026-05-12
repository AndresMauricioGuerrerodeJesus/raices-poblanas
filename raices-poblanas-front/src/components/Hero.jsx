import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-raices-light overflow-hidden">
      {/* Decoración de fondo artesanal */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-raices-accent/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-raices-green/10 text-raices-green text-sm font-bold mb-6">
              <ShieldCheck size={16} />
              Artesanías 100% Auténticas de la Sierra Norte
            </div>
            
            <h1 className="font-serif text-5xl lg:text-7xl text-raices-brown leading-tight mb-6">
              El alma de <br />
              <span className="text-raices-green italic">Puebla</span> en tus manos.
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed">
              Conectamos directamente con artesanos de Teziutlán y la Sierra Norte. 
              Cada pieza cuenta una historia única, verificada mediante tecnología QR 
              para garantizar su origen y comercio justo.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/tienda" className="flex items-center gap-2 bg-raices-brown text-white px-8 py-4 rounded-xl font-bold hover:bg-raices-brown/90 transition-all shadow-lg shadow-raices-brown/20 group">
                Explorar Galería
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link to="/comprobador" className="flex items-center gap-2 bg-white border-2 border-raices-brown/10 text-raices-brown px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
                Validar una pieza
              </Link>
            </div>

            {/* Stats de Impacto Social (Lo que mencionamos para Negocios en la nube) */}
            <div className="mt-12 grid grid-cols-3 gap-8 border-t border-raices-brown/10 pt-8">
              <div>
                <p className="text-3xl font-bold text-raices-green">+50</p>
                <p className="text-sm text-slate-500 font-medium">Artesanos</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-raices-green">100%</p>
                <p className="text-sm text-slate-500 font-medium">Comercio Justo</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-raices-green">Sierra N.</p>
                <p className="text-sm text-slate-500 font-medium">Origen</p>
              </div>
            </div>
          </motion.div>

          {/* Imagen de Impacto */}
          <motion.div 
            className="mt-16 lg:mt-0 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-2">
              <img 
                src="https://images.unsplash.com/photo-1590736962236-492723707c57?q=80&w=1000&auto=format&fit=crop" 
                alt="Artesanía Poblana"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Elemento flotante decorativo */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden sm:block -rotate-3 border border-raices-brown/5">
              <p className="text-raices-brown font-serif italic text-lg">"Tejido con amor en Cuetzalan"</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;