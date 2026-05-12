import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HistorySection from './components/HistorySection';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtisanDashboard from './pages/ArtisanDashboard';
import ProductManagement from './pages/ProductManagement';

// --- COMPONENTES PLACEHOLDER (Solo para los que NO tienes archivo todavía) ---
const Home = () => (<><Hero /><HistorySection /></>);
const Tienda = () => (<div className="p-20 text-center"><h2>Tienda de Artesanías</h2></div>);
const QRVerify = () => (<div className="p-20 text-center"><h2>Verificar Autenticidad</h2></div>);

// NOTA: He borrado el const ProductManagement de aquí para evitar el error de Vite

const CatalogManagement = () => (
  <div className="max-w-7xl mx-auto px-4 py-20 text-center text-raices-brown font-bold">
    <h2 className="font-serif text-4xl mb-4">Gestionar Mi Catálogo</h2>
    <p className="text-slate-500">Aquí aparecerá la lista de todas tus artesanías.</p>
  </div>
);

const OrderManagement = () => (
  <div className="max-w-7xl mx-auto px-4 py-20 text-center text-raices-brown font-bold">
    <h2 className="font-serif text-4xl mb-4">Gestionar Pedidos Recibidos</h2>
    <p className="text-slate-500">Control de estados de envío y ventas realizadas.</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-raices-light">
        <Navbar />
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/comprobador" element={<QRVerify />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/historia" element={<HistorySection />} />

          {/* Rutas de Gestión del Artesano */}
          {/* Redirección automática si escriben solo /artesano */}
          <Route path="/artesano" element={<Navigate to="/artesano/dashboard" replace />} />

          <Route path="/artesano/dashboard" element={<ArtisanDashboard />} />
          <Route path="/artesano/catalogo" element={<CatalogManagement />} />
          <Route path="/artesano/producto" element={<ProductManagement />} />
          <Route path="/artesano/pedidos" element={<OrderManagement />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;