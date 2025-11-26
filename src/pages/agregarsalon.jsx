import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";

export default function AgregarSalon() {
    const navigate = useNavigate();
    
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenUrl, setImagenUrl] = useState("");

    const handleGuardar = async () => {
        if (!nombre || !descripcion || !imagenUrl) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/api/rooms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: nombre,
                    description: descripcion,
                    img: imagenUrl
                })
            });

            if (!res.ok) throw new Error("Error al guardar el salón.");
            navigate("/gestionar-salones");

        } catch (error) {
            console.error(error);
            alert("No se pudo guardar el salón.");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                backgroundColor: "#f5efe5",
                minHeight: "100vh",
            }}
        >
            <Paper
                sx={{
                    width: "800px",
                    minHeight: "500px",
                    padding: 4,
                    borderRadius: 4,
                    boxShadow: 5,
                    backgroundColor: "#ffffff",
                }}
            >
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                    Agregar Salón al Catálogo
                </Typography>

                {/* Nombre */}
                <TextField
                    label="Nombre del salón"
                    variant="outlined"
                    fullWidth
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Descripción */}
                <TextField
                    label="Descripción"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={3}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Imagen URL */}
                <TextField
                    label="URL de la imagen"
                    variant="outlined"
                    fullWidth
                    value={imagenUrl}
                    onChange={(e) => setImagenUrl(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Vista previa */}
                {imagenUrl && (
                    <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
                        <img
                            src={imagenUrl}
                            alt="preview"
                            style={{
                                width: "300px",
                                borderRadius: "10px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            }}
                        />
                    </Box>
                )}

                {/* Guardar */}
                <Button
                    variant="contained"
                    color="success"
                    fullWidth
                    sx={{ mt: 4, paddingY: 1.4 }}
                    onClick={handleGuardar}
                >
                    Guardar Salón
                </Button>
            </Paper>
        </Box>
    );
}
