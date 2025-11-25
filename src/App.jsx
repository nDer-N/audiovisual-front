import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useAppContext } from "./context/AppContext";
import { useState, useEffect } from "react";

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
import {getProductos} from "./pages/productos";
import DetalleAdmin from "./pages/detalleadmin";
import EditarEquipo from "./pages/editarequipo";
import AgregarEquipo from "./pages/agregarequipo";
import {getSalones} from "./pages/salones";
import SalonesPage from "./pages/salonespage";
import ConfirmarSalon from "./pages/confirmarsalon";
import SalonesAdmin from "./pages/salonesadmin";
import AgregarSalon from "./pages/agregarsalon";
import DetalleSalonAdmin from "./pages/detallesalonadmin";
import RevisarPeticiones from "./pages/revisarpeticiones";
import PeticionesProductos from "./pages/peticionesproductos";
import PeticionesSalones from "./pages/peticionessalones";

import Usuario from "./pages/Usuario"; //  <<--- IMPORTANTE

export default function App() {
  const { isAuthenticated, user, isLoading, isAdmin } = useAppContext();
  const location = useLocation();
  
  const [catal, setCatal] = useState([]);
  const [cotol,setCotol]=useState([]);
  useEffect(() => {
    async function loadInv() {
      const data = await getProductos(); // ← aquí ya es el arreglo real
      setCatal(data);
      const data2 = await getSalones();
      setCotol(data2);
    }
    loadInv();
  }, [location.pathname]);

  console.log(catal);

  async function loadUser(user) { 
   const {name, email, image }=user;
   try {
    const res = await fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        warnings:[],
        img:image
      })
    });

    const data = await res.json();
    console.log("Usuario cargado o creado:", data);
    return data;

  } catch (error) {
    console.error("Error en loadUser:", error);
    return null;
  }

  }

  useEffect(() => {
    if (isAuthenticated && user && !isAdmin) {
      loadUser(user);   
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
    //crear objeto user
    
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
            <Route path="/confirmacion-del-salon/:id" element={<ConfirmarSalon cotol={cotol} />} />
            <Route path="/gestionar-salones" element={<SalonesAdmin cotol={cotol} setCotol={setCotol} />} />
            <Route path="/agregar-salones" element={<AgregarSalon cotol={cotol} setCotol={setCotol} />} />
            <Route path="/detalle-salon/:id" element={<DetalleSalonAdmin cotol={cotol} />} />
            <Route path="/mis-reservas" element={<MisReservas catal={catal} cotol={cotol}/>} />
            <Route path="/producto/:id" element={<Itempage catal={catal} />} /> 
            <Route path="/confirmacion/:id" element={<ConfirmationPage catal={catal}/>} />
            <Route path="/gestionar-equipo" element={<EquipmentAdmin catal={catal} setCatal={setCatal} />} />
            <Route path="/detalle-equipo/:id" element={<DetalleAdmin catal={catal} />} />
            <Route path="/edicion/:id" element={<EditarEquipo catal={catal} setCatal={setCatal} />} />
            <Route path="/agregar-producto" element={<AgregarEquipo catal={catal} setCatal={setCatal} />} />
            <Route path="/gestionar-salones" />
            <Route path="/revisar-peticiones" element={<RevisarPeticiones />}/>
            <Route path="/peticiones-salones" element={<PeticionesSalones cotol={cotol} setCotol={setCotol} />}/>
            <Route path="/peticiones-productos" element={<PeticionesProductos catal={catal} setCatal={setCatal}/>}/>
            <Route path="/perfiles" />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/Usuario" element={<Usuario />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}

