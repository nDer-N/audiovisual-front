import React from 'react'
import { useState } from "react";
import { Box, Paper, Typography, TextField } from "@mui/material";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';

export default function AgregarSalon() {
    const navigate = useNavigate();
    const { setNuevoSalon } = useAppContext();
    const [agregarnombre, setAgregarNombre] = useState("");
    const [agregardescripcion, setAgregarDescripcion] = useState("");
    const [agregarimagen, setAgregarImagen] = useState(null);
    const [previewimagen, setPreviewImagen] = useState(null);
    const [agregarid, setAgregarId] = useState("");
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAgregarImagen(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImagen(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleGuardar = () => {
        if (!agregarid || !agregarnombre || !agregardescripcion || !agregarimagen) {
            alert("Por favor completa todos los campos.");
            return;
        }

        const nuevosalon = {
            id: Number(agregarid),
            name: agregarnombre,
            description: agregardescripcion,
            image: previewimagen,
        };

        setNuevoSalon(nuevosalon);
        navigate("/gestionar-salones");
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
                    minHeight: "600px",
                    padding: 4,
                    borderRadius: 4,
                    boxShadow: 5,
                    backgroundColor: "#ffffff",
                }}
            >
                <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                    Agregar Salón al Catálogo
                </Typography>

                {/* ID */}
                <TextField
                    label="ID del salón"
                    variant="outlined"
                    fullWidth
                    value={agregarid}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setAgregarId(value);
                        }
                    }}
                    sx={{ mb: 2 }}
                />

                {/* Nombre */}
                <TextField
                    label="Nombre del salón"
                    variant="outlined"
                    fullWidth
                    value={agregarnombre}
                    onChange={(e) => setAgregarNombre(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Descripción */}
                <TextField
                    label="Descripción"
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={3}
                    value={agregardescripcion}
                    onChange={(e) => setAgregarDescripcion(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* Imagen */}
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                    Imagen del salón:
                </Typography>
                <Button variant="contained" component="label" sx={{ mb: 2 }}>
                    Subir imagen
                    <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                </Button>

                {previewimagen && (
                    <Box
                        sx={{
                            mt: 2,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={previewimagen}
                            alt="preview"
                            style={{
                                width: "300px",
                                borderRadius: "10px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            }}
                        />
                    </Box>
                )}

                {/* Botón Guardar */}
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
