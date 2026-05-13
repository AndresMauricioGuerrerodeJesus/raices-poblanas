import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HistorySection from './components/HistorySection';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtisanDashboard from './pages/ArtisanDashboard';
import ProductManagement from './pages/ProductManagement';
import Store from './pages/Store';
import QRModule from './pages/QRModule';
import ArtisanOrders from './pages/ArtisanOrders';
import ArtisanProfile from './pages/ArtisanProfile';
import Notifications from './pages/Notifications';

const Home = () => (<><Hero /><HistorySection /></>);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-raices-light">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Store />} />
          <Route path="/comprobador" element={<QRModule />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/historia" element={<HistorySection />} />

          {/* Rutas de Gestión del Artesano */}
          <Route path="/artesano" element={<Navigate to="/artesano/dashboard" replace />} />
          <Route path="/artesano/dashboard" element={<ArtisanDashboard />} />
          <Route path="/artesano/producto" element={<ProductManagement />} />
          <Route path="/artesano/pedidos" element={<ArtisanOrders />} />
          <Route path="/artesano/perfil" element={<ArtisanProfile />} />
          <Route path="/artesano/notificaciones" element={<Notifications />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;