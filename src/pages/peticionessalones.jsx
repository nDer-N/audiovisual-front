import React, { useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, Avatar } from "@mui/material";
import { useAppContext } from "../context/AppContext";

export default function PeticionesSalones({ cotol, setCotol }) {
    const { reser, setReser } = useAppContext();
    const productos = reser.filter((r) => r.isRoom === true);
    const manejarStatus = (id, status) => {
        setReser((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status } : item
            )
        );
    };
    return (
        <Box p={4} sx={{ minHeight: "100vh", bgcolor: "#f3ede4" }}>
            <Typography variant="h4" mb={4} fontWeight="bold" textAlign="center">
                Peticiones de Productos
            </Typography>


            <Grid container spacing={3} justifyContent="center">
                {productos.map((item) => (
                    <Grid key={item.id}>
                        <Card sx={{ p: 2, display: "flex", alignItems: "center", borderRadius: 3 }}>
                            {/* Avatar */}
                            <Avatar sx={{ width: 64, height: 64, mr: 2 }} />


                            {/* Contenido */}
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {item.name}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {item.description}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Fecha:</strong> {item.day}/{item.month}/{item.year}
                                </Typography>
                            </CardContent>


                            {/* Botones */}
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Button
                                    variant="contained"
                                    onClick={() => manejarStatus(item.id, "accepted")}
                                    sx={{
                                        bgcolor: item.status === "accepted" ? "#10b759" : "#28a745",
                                        width: item.status === "accepted" ? 150 : 100,
                                        transition: "0.3s",
                                        color: "white",
                                        fontWeight: "bold",
                                        "&:hover": { bgcolor: "#1f8f47" }
                                    }}
                                >
                                    {item.status === "aceptada" ? "Aceptada" : "Accept"}
                                </Button>


                                <Button
                                    variant="contained"
                                    onClick={() => manejarStatus(item.id, "denied")}
                                    sx={{
                                        bgcolor: item.status === "denied" ? "#d11a1a" : "#e03535",
                                        width: item.status === "denied" ? 150 : 100,
                                        transition: "0.3s",
                                        color: "white",
                                        fontWeight: "bold",
                                        "&:hover": { bgcolor: "#b21212" }
                                    }}
                                >
                                    {item.status === "rechazada" ? "Rechazada" : "Deny"}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}