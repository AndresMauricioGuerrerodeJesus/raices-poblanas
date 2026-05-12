import { Package, DollarSign, PlusCircle, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ArtisanDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12">
        <h2 className="font-serif text-4xl text-raices-brown font-bold italic">
          Bienvenido, <span className="text-raices-green">{user?.username}</span>
        </h2>
        <p className="text-slate-500 mt-2 font-medium">Panel de control de tu taller artesanal.</p>
      </header>

      {/* TARJETAS DE ACCESO RÁPIDO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* CONECTOR A PRODUCTOS */}
        <div
          onClick={() => navigate('/artesano/producto')}
          className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
        >
          <div className="bg-raices-green/10 w-16 h-16 rounded-2xl flex items-center justify-center text-raices-green mb-6 group-hover:bg-raices-green group-hover:text-white transition-colors">
            <Package size={32} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-raices-brown">Mis Productos</h3>
          <p className="text-slate-500 mt-2">Gestiona tu catálogo, edita precios y ve tus piezas únicas.</p>
        </div>

        {/* BOTÓN "NUEVA PIEZA" RÁPIDO */}
        <div
          onClick={() => navigate('/artesano/producto')} // El componente ya tiene el modal de "Nuevo"
          className="bg-[#5D4037] p-8 rounded-[2rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer text-white group"
        >
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
            <PlusCircle size={32} />
          </div>
          <h3 className="font-serif text-2xl font-bold">Registrar Obra</h3>
          <p className="text-white/70 mt-2">Crea una nueva ficha técnica y genera su código QR de autenticidad.</p>
        </div>

        {/* MÉTRICAS DE VENTA (PRÓXIMAMENTE) */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl opacity-60">
          <div className="bg-raices-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center text-raices-accent mb-6">
            <DollarSign size={32} />
          </div>
          <h3 className="font-serif text-2xl font-bold text-raices-brown">Mis Ventas</h3>
          <p className="text-slate-500 mt-2">Próximamente: Historial de ingresos y pedidos completados.</p>
        </div>

      </div>
    </div>
  );
};

export default ArtisanDashboard;