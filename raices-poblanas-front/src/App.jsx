import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HistorySection from './components/HistorySection';
import Login from './pages/Login'; // <--- 1. ASEGÚRATE DE QUE ESTO ESTÉ AQUÍ

const Home = () => (
  <>
    <Hero />
    <HistorySection />
  </>
);

const Tienda = () => (
  <div className="max-w-7xl mx-auto px-4 py-20">
    <h2 className="font-serif text-4xl text-raices-brown">Catálogo de Artesanías</h2>
  </div>
);

const QRVerify = () => (
  <div className="max-w-7xl mx-auto px-4 py-20 text-center">
    <h2 className="font-serif text-4xl text-raices-brown">Comprobador QR</h2>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-raices-light">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/comprobador" element={<QRVerify />} />
          
          {/* LA LÍNEA QUE FALTA ES ESTA: */}
          <Route path="/login" element={<Login />} /> 
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;