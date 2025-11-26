import { Typography } from '@mui/material';
import React from 'react';
import { Box, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';

import { useNavigate } from 'react-router';

import App from '../App';



export default function ReservarEquipo({catal}) {
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
      {catal.map((pro) => (
        <Grid key={pro._id}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 3,
              width:"100%",
              backgroundColor: "#f4f0e8"
            }}
          >
            <CardActionArea onClick={() => handleClick(pro._id)}>
              <CardMedia
                component="img"
                height="420"
                image={pro.img}
                alt={pro.name}
                sx={{ objectFit: "contain", padding: 4, margin: "15 auto", width: "auto" }}
              />
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {pro.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}