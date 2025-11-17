import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import { Box } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";

import AppBarHeader from './components/AppBarHeader';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';

import LoginPage from "./pages/LoginPage";
import AccessDenied from "./pages/AccessDenied";

import Home from './pages/Home';
import ReservarEquipo from './pages/ReservarEquipo';
import ReservarSalones from './pages/ReservarSalones';
import MisReservas from './pages/MisReservas';
import FAQ from './pages/FAQ';

function AppContent() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) return <p>Cargando...</p>;

  const email = user?.email || "";
  const isValidEmail = email.endsWith("@up.edu.mx");

  // 🔥 AQUÍ ESTÁ EL TERNARIO ÚNICO
  return !isAuthenticated ? (
    <LoginPage />
  ) : !isValidEmail ? (
    <AccessDenied />
  ) : (
    // Si está autenticado y tiene correo válido, mostrar la app completa
    <Box sx={{ display: 'flex' }}>
      <SideMenu />
      <Box sx={{ flexGrow: 1 }}>
        <AppBarHeader />
        <Box sx={{ p: 3, minHeight: '80vh', position: 'relative' }}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/reservar-equipo" element={<ReservarEquipo />} />
            <Route path="/reservar-salones" element={<ReservarSalones />} />
            <Route path="/mis-reservas" element={<MisReservas />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    
      <AppContent />
    
  );
}
