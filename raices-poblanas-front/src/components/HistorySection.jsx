import { motion } from 'framer-motion';
import manosImg from '../assets/artesana-manos.png';

const HistorySection = () => {
  return (
    // Agregamos id="historia" para que el navegador sepa dónde está esta sección
    <section id="historia" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Lado de la Imagen con efecto de marco */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 border-2 border-raices-accent/30 rounded-2xl translate-x-4 translate-y-4 -z-10" />
            <img 
              src={manosImg} 
              alt="Manos artesanas" 
              className="rounded-2xl shadow-2xl w-full object-cover aspect-video lg:aspect-square"
            />
          </motion.div>

          {/* Lado del Texto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl text-raices-brown mb-6">
              Más que un producto, <br />
              <span className="text-raices-green italic">es una herencia.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              En la Sierra Norte de Puebla, cada puntada y cada trazo tienen un significado. 
              Nuestra plataforma nace para proteger este conocimiento ancestral. 
            </p>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="bg-raices-accent/20 p-2 rounded-lg text-raices-brown font-bold">01</div>
                <div>
                  <h4 className="font-bold text-raices-brown">Comercio sin intermediarios</h4>
                  <p className="text-slate-500">El 85% de cada venta va directo al taller del artesano.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-raices-accent/20 p-2 rounded-lg text-raices-brown font-bold">02</div>
                <div>
                  <h4 className="font-bold text-raices-brown">Trazabilidad Tecnológica</h4>
                  <p className="text-slate-500">Usamos códigos únicos para certificar que tu pieza no es una imitación industrial.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HistorySection;