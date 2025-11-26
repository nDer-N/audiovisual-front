import { Typography } from '@mui/material';
import React from 'react';
import { Box, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import imagen1 from "../images/camara.jpg";
import imagen2 from "../images/salon.png";

import { useNavigate } from 'react-router';

export default function SeleccionCarro() {
    const navigate = useNavigate();
    const cards = [
        {
            title: "Mis reservaciones de Productos",
            image: imagen1,
            route: "/mis-reservas-productos",
        },
        {
            title: "Mis reservaciones de Salones",
            image: imagen2,
            route: "/mis-reservas-salones",
        },
    ];
    return (
        <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f3f3f3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Grid
        container
        spacing={6}
        maxWidth={480}
        justifyContent="center"
      >
        {cards.map((card, index) => (
          <Grid key={index}>
            <Box
              onClick={() => navigate(card.route)}
              sx={{
                cursor: "pointer",
                backgroundColor: "#e9e4dd",
                borderRadius: "20px",
                width: "100%",
                height: "480px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 6px 16px rgba(0,0,0,0.22)",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
              }}
            >
              {/* Imagen */}
              <Box
                component="img"
                src={card.image}
                alt={card.title}
                sx={{
                  width: "90%",
                  height: "80%",
                  objectFit: "cover",
                  borderRadius: "15px",
                }}
              />

              {/* Texto */}
              <Typography
                variant="h6"
                sx={{ mt: 2, fontWeight: "bold", textAlign: "center" }}
              >
                {card.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}