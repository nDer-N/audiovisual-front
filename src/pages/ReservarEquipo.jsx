import { Typography } from '@mui/material';
import React from 'react';
import { Box, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import imagen from "../images/Meowl.jpeg"

const productos = [
  { id: 1, nombre: "camara1", cantidad: 99, img: imagen, descripcion:"i´m a new soul" },
  { id: 2, nombre: "camara2", cantidad: 99, img: imagen, descripcion:"born in a new world" },
  { id: 3, nombre: "camara3", cantidad: 99, img: imagen, descripcion:"born in a new world" },
  { id: 4, nombre: "camara4", cantidad: 99, img: imagen, descripcion:"born in a new world" },
  { id: 5, nombre: "camara5", cantidad: 99, img: imagen, descripcion:"born in a new world" },
  { id: 6, nombre: "camara6", cantidad: 99, img: imagen, descripcion:"born in a new world" }
];

export default function ReservarEquipo() {

  const handleClick = (id) => {
    console.log("Clic en producto:", id);
  };

  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      sx={{ padding: "20px" }}
    >
      {productos.map((pro) => (
        <Grid item xs={12} sm={6} md={4} key={pro.id}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: "#f4f0e8"
            }}
          >
            <CardActionArea onClick={() => handleClick(pro.id)}>
              <CardMedia
                component="img"
                height="220"
                image={pro.img}
                alt={pro.nombre}
                sx={{ objectFit: "contain", padding: 4, margin: "5 auto", width: "auto" }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {pro.nombre}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}