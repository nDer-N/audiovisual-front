import React from "react"; 
import {
  Box,
  Typography,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
  IconButton,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useAppContext } from "../context/AppContext";
import { useNavigate, useLocation } from "react-router";

export default function PerfilUsuario() {
  const { user, logout } = useAppContext();
   const location = useLocation();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // redirige a Home.jsx
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 8,
        padding: "40px",
        bgcolor: "#f3eee5",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* CAMPANA */}
      <IconButton sx={{ position: "absolute", top: 30, right: 40 }}>
        <NotificationsNoneIcon sx={{ fontSize: 35 }} />
      </IconButton>

      {/* IZQUIERDA */}
      <Box
        sx={{
          width: "35%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Avatar
          sx={{
            width: 230,
            height: 230,
            bgcolor: "black",
            mb: 3,
          }}
          src={user.picture}
        />

        <Typography sx={{ fontSize: "26px", fontWeight: "500" }}>
          Detalles del perfil
        </Typography>

        <Button
          onClick={handleGoHome}
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          sx={{
            width: "190px",
            mt: 6,
            textTransform: "none",
            color: "#1d1d8f",
            borderColor: "#1d1d8f",
          }}
        >
          Return to main page
        </Button>
      </Box>

      {/* CONTENEDOR DEL MARCO Y LOGOUT */}
      <Box
        sx={{
          position: "relative",
          width: "40%",
        }}
      >
        {/* MARCO MORADO */}
        <Paper
          elevation={0}
          sx={{
            border: "2px dashed #b9a6ff",
            borderRadius: "12px",
            padding: "25px",
            mt: 1,
            bgcolor: "transparent",
            height: "auto",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "500",
              pb: 2,
            }}
          >
            Mis Reservas
          </Typography>

          <Divider sx={{ mb: 2 }} />
             {/* LOGOUT FUERA DEL MARCO */}
        
          <Accordion disableGutters>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight="500">Equipos</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography color="gray">Especificaciones generales</Typography>
            </AccordionDetails>
          </Accordion>

          <Accordion disableGutters>
            <AccordionSummary expandIcon={<AddIcon />}>
              <Typography fontWeight="500">Salones</Typography>
            </AccordionSummary>
          </Accordion>

          <Accordion expanded disableGutters>
            <AccordionSummary>
              <Typography fontWeight="500">Advertencias</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  borderLeft: "4px solid #7aa0ff",
                  pl: 1.5,
                }}
              >
                <Typography color="gray">
                  Tincidunt purus at amet, eu nisl urna at. Pellentesque diam
                  dictum consectetur leo ipsum. Lectus gravida id aliquamc
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
          
        </Paper>
                <IconButton
          sx={{
            margin: "10px",
            display: "justify-right ",
            right: -900,
            bgcolor: "white",
            boxShadow: 3,
          }}
          onClick={() =>
            logout({
              logoutParams: { returnTo: window.location.origin },
            })
          }
        >
          <LogoutIcon sx={{ fontSize: 30 }} />
        </IconButton>
       
      </Box>
    </Box>
  );
}





