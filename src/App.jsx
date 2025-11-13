import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import { Box, Slide } from '@mui/material';
import { useState, useEffect } from 'react';
import AppBarHeader from './components/AppBarHeader';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import ReservarEquipo from './pages/ReservarEquipo';
import ReservarSalones from './pages/ReservarSalones';
import MisReservas from './pages/MisReservas';
import FAQ from './pages/FAQ';

function AnimatedRoutes() {
  const location = useLocation();
  const [inProp, setInProp] = useState(true);

  useEffect(() => {
    setInProp(false);
    const timeout = setTimeout(() => setInProp(true), 100);
    return () => clearTimeout(timeout);
  }, [location]);

  return (
    
      <Box>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/reservar-equipo" element={<ReservarEquipo />} />
          <Route path="/reservar-salones" element={<ReservarSalones />} />
          <Route path="/mis-reservas" element={<MisReservas />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Box>
    
  );
}

export default function App() {
  return (
    <AppProvider>
    <Router>
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1 }}>
          <AppBarHeader />
          <Box sx={{ p: 3, minHeight: '80vh', position: 'relative' }}>
            <AnimatedRoutes />
          </Box>
          <Footer />
        </Box>
      </Box>
    </Router>
    </AppProvider>
  );
}
