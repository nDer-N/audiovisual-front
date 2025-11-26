import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router';

export default function AgregarEquipo() {
  const navigate = useNavigate();

  const [agregarnombre, setAgregarNombre] = useState("");
  const [agregardescripcion, setAgregarDescripcion] = useState("");
  const [agregarCantidad, setAgregarCantidad] = useState(1);
  const [agregarimagen, setAgregarImagen] = useState("");

  const handleGuardar = async () => {
    if (!agregarnombre || !agregardescripcion || !agregarCantidad || !agregarimagen) {
      alert("Por favor completa todos los campos.");
      return;
    }

    const nuevoproducto = {
      name: agregarnombre,
      description: agregardescripcion,
      quantity: Number(agregarCantidad),
      img: agregarimagen, // ahora es URL, no base64
    };

    try {
      const res = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoproducto),
      });

      const data = await res.json();
      console.log("Producto guardado:", data);

      alert("Producto agregado correctamente");
      navigate("/gestionar-equipo");

    } catch (error) {
      console.error("Error al guardar producto:", error);
      alert("Hubo un error al guardar el producto.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
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
          Agregar Producto al Catálogo
        </Typography>

        <TextField
          label="Nombre del producto"
          variant="outlined"
          fullWidth
          value={agregarnombre}
          onChange={(e) => setAgregarNombre(e.target.value)}
          sx={{ mb: 2 }}
        />

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

        <TextField
          label="Cantidad disponible"
          type="number"
          variant="outlined"
          fullWidth
          value={agregarCantidad}
          onChange={(e) => setAgregarCantidad(e.target.value)}
          sx={{ mb: 3 }}
        />

        <TextField
          label="URL de la imagen"
          variant="outlined"
          fullWidth
          value={agregarimagen}
          onChange={(e) => setAgregarImagen(e.target.value)}
          sx={{ mb: 2 }}
        />

        {agregarimagen && (
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <img
              src={agregarimagen}
              alt="preview"
              style={{
                width: "300px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </Box>
        )}

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 4, paddingY: 1.4 }}
          onClick={handleGuardar}
        >
          Guardar Producto
        </Button>
      </Paper>
    </Box>
  );
}
