import { Typography } from '@mui/material';
import React from 'react';
import { Box, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

import { useNavigate } from 'react-router';
import productos from './productos';



export default function ReservarEquipo() {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/producto/${id}`);
  };

  return (
    <Grid
      container
      spacing={12}
      justifyContent="center"
      sx={{ padding: "20px" }}
    >
      {productos.map((pro) => (
        <Grid key={pro.id}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              height:350,
              width:"100%",
              backgroundColor: "#f4f0e8"
            }}
          >
            <CardActionArea onClick={() => handleClick(pro.id)}>
              <CardMedia
                component="img"
                height="220"
                image={pro.img}
                alt={pro.nombre}
                sx={{ objectFit: "contain", padding: 4, margin: "15 auto", width: "auto" }}
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