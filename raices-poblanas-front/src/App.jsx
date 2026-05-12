import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Login from './pages/Login';
// Nuevas Importaciones
import ArtisanDashboard from './pages/ArtisanDashboard';
import ManageCatalog from './pages/ManageCatalog';
import ManageProduct from './pages/ManageProduct';
import ManageOrders from './pages/ManageOrders';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-raices-light">
        <Navbar />
        <Routes>
          <Route path="/" element={<><Hero /></>} />
          <Route path="/login" element={<Login />} />
          
          {/* Rutas del Artesano */}
          <Route path="/dashboard" element={<ArtisanDashboard />} />
          <Route path="/gestionar-catalogo" element={<ManageCatalog />} />
          <Route path="/gestionar-producto" element={<ManageProduct />} />
          <Route path="/gestionar-producto/:id" element={<ManageProduct />} />
          <Route path="/gestionar-pedidos" element={<ManageOrders />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;