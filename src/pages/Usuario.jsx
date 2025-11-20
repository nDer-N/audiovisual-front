import React, { useState } from "react";
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
  Fade,
  Slide,
  Badge,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";

export default function PerfilUsuario() {
  const { user, logout, isAdmin } = useAppContext();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  // ---------------------------
  // 🔔 NOTIFICACIONES
  // ---------------------------
  const [openNoti, setOpenNoti] = useState(false);

  // NOTIFICACIONES DE EJEMPLO (pondrás las tuyas aquí)
  const notifications = [
    { id: 1, text: "Tu reserva ha sido aprobada." },
    { id: 2, text: "Recuerda entregar el equipo mañana." },
  ];

  const handleToggleNoti = () => {
    setOpenNoti((prev) => !prev);
  };

  // Hay notificaciones?
  const hasNotifications = notifications.length > 0;

  // ---------------------------

  return isAdmin ? (
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
      {/* CAMPANA CON PUNTO ROJO */}
      <IconButton
        onClick={handleToggleNoti}
        sx={{ position: "absolute", top: 30, right: 40 }}
      >
        <Badge color="error" variant="dot" invisible={!hasNotifications}>
          <NotificationsNoneIcon sx={{ fontSize: 35 }} />
        </Badge>
      </IconButton>

      {/* PANEL DE NOTIFICACIONES (admin) */}
      <Fade in={openNoti}>
        <Slide direction="down" in={openNoti} mountOnEnter unmountOnExit>
          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              top: 80,
              right: 40,
              width: 300,
              maxHeight: 350,
              overflowY: "auto",
              p: 2,
              borderRadius: "12px",
              bgcolor: "white",
              zIndex: 999,
            }}
          >
            <Typography fontSize={18} fontWeight="600" mb={1}>
              Notificaciones
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {notifications.length === 0 ? (
              <Typography color="gray">No tienes notificaciones.</Typography>
            ) : (
              notifications.map((n) => (
                <Typography key={n.id} sx={{ mb: 1 }}>
                  • {n.text}
                </Typography>
              ))
            )}
          </Paper>
        </Slide>
      </Fade>

      {/* IZQUIERDA */}
      <Box
        sx={{
          width: "35%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Avatar
          sx={{
            position: "relative",
            width: 530,
            height: 530,
            right: -700,
            bgcolor: "black",
            mb: 3,
          }}
          src={user.picture}
        />

        <Typography sx={{ fontSize: "26px", fontWeight: "500", right: -700, position: "relative" }}>
          Detalles del perfil
        </Typography>

        {/* LOGOUT */}
        <IconButton
          sx={{
            position: "relative",
            margin: "10px",
            right: -700,
            bgcolor: "white",
            boxShadow: 3,
          }}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <LogoutIcon sx={{ fontSize: 30 }} />
        </IconButton>

        {/* VOLVER */}
        <Button
          onClick={handleGoHome}
          variant="outlined"
          startIcon={<ArrowBackIosNewIcon />}
          sx={{
            position: "relative",
            width: "290px",
            right: -700,
            mt: 4,
            textTransform: "none",
            color: "#1d1d8f",
            borderColor: "#1d1d8f",
          }}
        >
          Return to main page
        </Button>
      </Box>
    </Box>
  ) : (
    /* ---------------------- USUARIO NORMAL ----------------------- */
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
      <IconButton
        onClick={handleToggleNoti}
        sx={{ position: "absolute", top: 30, right: 40 }}
      >
        <Badge color="error" variant="dot" invisible={!hasNotifications}>
          <NotificationsNoneIcon sx={{ fontSize: 35 }} />
        </Badge>
      </IconButton>

      {/* PANEL DE NOTIFICACIONES (usuario) */}
      <Fade in={openNoti}>
        <Slide direction="down" in={openNoti} mountOnEnter unmountOnExit>
          <Paper
            elevation={4}
            sx={{
              position: "absolute",
              top: 80,
              right: 40,
              width: 300,
              maxHeight: 350,
              overflowY: "auto",
              p: 2,
              borderRadius: "12px",
              bgcolor: "white",
              zIndex: 999,
            }}
          >
            <Typography fontSize={18} fontWeight="600" mb={1}>
              Notificaciones
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {notifications.length === 0 ? (
              <Typography color="gray">No tienes notificaciones.</Typography>
            ) : (
              notifications.map((n) => (
                <Typography key={n.id} sx={{ mb: 1 }}>
                  • {n.text}
                </Typography>
              ))
            )}
          </Paper>
        </Slide>
      </Fade>

      {/* IZQUIERDA */}
      <Box
        sx={{
          width: "35%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Avatar
          sx={{
            width: 430,
            height: 430,
            bgcolor: "black",
            right: -200,
            mb: 3,
          }}
          src={user.picture}
        />

        <Typography sx={{ fontSize: "26px", fontWeight: "500", right: -300, position: "relative"  }}>
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
            right: -300,
            borderColor: "#1d1d8f",
          }}
        >
          Return to main page
        </Button>
      </Box>

      {/* CONTENIDO */}
      <Box sx={{ position: "relative", width: "40%" }}>
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
              <Box sx={{ borderLeft: "4px solid #7aa0ff", pl: 1.5 }}>
                <Typography color="gray">
                  Tincidunt purus at amet, eu nisl urna at. Pellentesque diam
                  dictum consectetur leo ipsum. Lectus gravida id aliquamc
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Paper>

        {/* Logout */}
        <IconButton
          sx={{
            margin: "10px",
            right: -900,
            bgcolor: "white",
            boxShadow: 3,
          }}
          onClick={() =>
            logout({ logoutParams: { returnTo: window.location.origin } })
          }
        >
          <LogoutIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>
    </Box>
  );
}






