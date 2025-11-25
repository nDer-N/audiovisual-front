import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button, Grid } from "@mui/material";
import App from "../App";
import { useAppContext } from "../context/AppContext";

export default function MisReservas({ catal, cotol }) {
  const { reser, setReser } = useAppContext();
  const actualizarEstado = (id, nuevoStatus) => {
    setReser(prev =>
      prev.map(r => (r.id === id ? { ...r, status: nuevoStatus } : r))
    );
  };

  const cancelarReserva = (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres cancelar la reserva?");
    if (!confirmacion) return;
    setReser(prev => prev.filter(r => r.id !== id));
    console.log(reser);
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "aceptada":
        return "#4caf50";
      case "rechazada":
        return "#d32f2f";
      default:
        return "#ffb300";
    }
  };

  return (
    <Box
      p={4}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}
    >
      <Box sx={{ width: "85%", bgcolor: "#eee9df", borderRadius: 3, p: 4, boxShadow: 3 }}>

        {/* Si no hay reservas */}
        {reser.length === 0 ? (
          <Typography variant="h5" textAlign="center" mt={4}>
            No tienes ninguna reserva.
          </Typography>
        ) : (
          <Grid container spacing={6} justifyContent="center">
            {reser.map((item) => (
              <Grid container item key={item.id} sx={{ maxWidth: 900 }}>

                {/* Imagen */}
                <Grid item >
                  <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      sx={{ height: 280, objectFit: "contain", p: 1, minHeight: 400, width: 400 }}
                    />
                  </Card>
                </Grid>

                {/* Información */}
                <Grid item >
                  <Card sx={{ p: 2, borderRadius: 3 }}>
                    <CardContent>

                      {/* Nombre */}
                      <Typography variant="h5" fontWeight="bold" mb={1}>
                        {item.name}
                      </Typography>

                      {/* Descripcion */}
                      <Typography variant="body1" color="text.secondary" mb={1}>
                        {item.description}
                      </Typography>

                      {/* Solo sale la cantidad si no es Salon */}
                      {!item.isRoom && (
                        <Typography variant="body1" mb={1}>
                          <strong>Cantidad:</strong> {item.quantity}
                        </Typography>
                      )}

                      {/* Fecha */}
                      <Typography variant="body1">
                        <strong>Fecha reservada:</strong> {item.day}/{item.month}/{item.year}
                      </Typography>

                      {/* Estado de la peticion */}
                      <Typography
                        sx={{
                          mt: 2,
                          fontWeight: "bold",
                          color: getStatusColor(item.status),
                          fontSize: "1.1rem"
                        }}
                      >
                        Estado: {item.status}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Botón cancelar */}
                <Grid textAlign="center" display="flex" alignItems="center">
                  <Button
                    variant="contained"
                    onClick={() => cancelarReserva(item.id)}
                    sx={{
                      bgcolor: "#e8a6a6",
                      color: "#8c0000",
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      "&:hover": { bgcolor: "#d98d8d" },
                    }}
                  >
                    Cancelar reserva
                  </Button>
                </Grid>

              </Grid>
            ))}
          </Grid>

        )}
      </Box>
    </Box>
  );
}
