import { Typography } from '@mui/material';
import React from 'react';
import { Box, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

import { useNavigate } from 'react-router';
import salon from './salones';
import App from '../App';



export default function ReservarSalones({cotol}) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/salon/${id}`);
  };

  return (
    <Grid
      container
      spacing={12}
      justifyContent="center"
      sx={{ padding: "20px" }}
    >
      {cotol.map((sal) => (
        <Grid key={sal.id}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              width:"100%",
              backgroundColor: "#f4f0e8"
            }}
          >
            <CardActionArea onClick={() => handleClick(sal.id)}>
              <CardMedia
                component="img"
                height="420"
                image={sal.img}
                alt={sal.name}
                sx={{ objectFit: "contain", padding: 4, margin: "15 auto", width: "auto" }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {sal.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}