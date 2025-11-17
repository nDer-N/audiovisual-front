import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useAppContext } from "./context/AppContext";

import AppBarHeader from "./components/AppBarHeader";
import SideMenu from "./components/SideMenu";
import Footer from "./components/Footer";

import LoginPage from "./pages/LoginPage";
import AccessDenied from "./pages/AccessDenied";

import Home from "./pages/Home";
import ReservarEquipo from "./pages/ReservarEquipo";
import ReservarSalones from "./pages/ReservarSalones";
import MisReservas from "./pages/MisReservas";
import FAQ from "./pages/FAQ";

export default function App() {
  const { isAuthenticated, user, isLoading, isAdmin } = useAppContext();
  const location = useLocation();

  if (isLoading) return <p>Cargando...</p>;

  const email = user?.email || "";
  const isValidEmail = email.endsWith("@up.edu.mx");

  return !isAuthenticated ? (
    <LoginPage />
  ) : !isValidEmail ? (
    <AccessDenied />
  ) : (
    <Box sx={{ display: "flex" }}>
      <SideMenu isAdmin={isAdmin} />

      <Box sx={{ flexGrow: 1 }}>
        <AppBarHeader isAdmin={isAdmin} />

        <Box sx={{ p: 3, minHeight: "80vh", position: "relative" }}>
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
