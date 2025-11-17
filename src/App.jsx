import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

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
  const { isAuthenticated, user, isLoading } = useAuth0();
  const location = useLocation();

 
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      
      const adminEmails = ["admin@up.edu.mx"]; //Esto hay que cambiarlo por un JWT del correo del admin o algo asi macy y joshidito.

      const userIsAdmin =
        adminEmails.includes(user.email) ||
        user?.["https://up.edu.mx/role"] === "admin";

      setIsAdmin(userIsAdmin);
    }
  }, [isAuthenticated, user]);

 
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

            {/* 🔥 EJEMPLO: Ruta admin (si quieres agregar una) */}
            {/* {isAdmin && <Route path="/admin" element={<AdminDashboard />} />} */}
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}
