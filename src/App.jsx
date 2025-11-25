import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useAppContext } from "./context/AppContext";
import { useState } from "react";

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
import Itempage from "./pages/itempage";
import ConfirmationPage from "./pages/ConfirmationPage";
import EquipmentAdmin from "./pages/EquipmentAdmin";
import productos from "./pages/productos";
import DetalleAdmin from "./pages/detalleadmin";
import EditarEquipo from "./pages/editarequipo";
import AgregarEquipo from "./pages/agregarequipo";
import salones from "./pages/salones";
import SalonesPage from "./pages/salonespage";
import ConfirmarSalon from "./pages/confirmarsalon";
import SalonesAdmin from "./pages/salonesadmin";
import AgregarSalon from "./pages/agregarsalon";
import DetalleSalonAdmin from "./pages/detallesalonadmin";

export default function App() {
  const { isAuthenticated, user, isLoading, isAdmin } = useAppContext();
  const location = useLocation();
  const [catal, setCatal] = useState(productos);
  const [cotol,setCotol]=useState(salones);

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
            <Route path="/reservar-equipo" element={<ReservarEquipo catal={catal} />} />
            <Route path="/reservar-salones" element={<ReservarSalones cotol={cotol} />} />
            <Route path="/salon/:id" element={<SalonesPage cotol={cotol}/>}/>
            <Route path="/confirmacion-del-salon/:id" element={<ConfirmarSalon />} />
            <Route path="/gestionar-salones" element={<SalonesAdmin cotol={cotol} setCotol={setCotol} />} />
            <Route path="/agregar-salones" element={<AgregarSalon cotol={cotol} setCotol={setCotol} />} />
            <Route path="/detalle-salon/:id" element={<DetalleSalonAdmin cotol={cotol} />} />
            <Route path="/mis-reservas" element={<MisReservas catal={catal} cotol={cotol}/>} />
            <Route path="/producto/:id" element={<Itempage catal={catal} />} />
            <Route path="/confirmacion/:id" element={<ConfirmationPage />} />
            <Route path="/gestionar-equipo" element={<EquipmentAdmin catal={catal} setCatal={setCatal} />} />
            <Route path="/detalle-equipo/:id" element={<DetalleAdmin catal={catal} />} />
            <Route path="/edicion/:id" element={<EditarEquipo catal={catal} setCatal={setCatal} />} />
            <Route path="/agregar-producto" element={<AgregarEquipo catal={catal} setCatal={setCatal} />} />
            <Route path="/gestionar-salones" />
            <Route path="/revisar-peticiones" />
            <Route path="/perfiles" />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}
