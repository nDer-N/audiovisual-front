import React from 'react';
import { useState } from 'react';
import { Box, Grid, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';
import { useEffect } from 'react';

export default function EquipmentAdmin({ catal, setCatal }) {
  const navigate = useNavigate();
  const { isAdmin, nuevoproducto } = useAppContext();
  console.log(nuevoproducto);

  const eliminarProducto = (id) => {
    setCatal((prev) => prev.filter((item) => item.id !== id));
  };
  const irADetalle = (id) => {
    navigate(`/detalle-equipo/${id}`);
  };
  const agregarProducto = () => {
    navigate('/agregar-producto');
  };
  {/*
  const editarproducto = (id) => {
    navigate(`/edicion/${id}`);
  };
  */}

  useEffect(() => {
    if (!nuevoproducto || !nuevoproducto.id) return;

    setCatal((prev) => {
      const existe = prev.some((item) => item.id === nuevoproducto.id);
      if (existe) return prev;

      return [...prev, {
        ...nuevoproducto,
        img: nuevoproducto.imagen
      }];
    });
  }, [nuevoproducto]);

  return  isAdmin ?  (
    <Box p={4}>
      <Grid container spacing={7} justifyContent="center">
        {catal.map((item) => (
          <Grid key={item.id}>
            <Card sx={{ p: 2, position: 'relative', borderRadius: 3, boxShadow: 3 }}>
              <Button
                onClick={() => eliminarProducto(item.id)}
                sx={{
                  minWidth: 0,
                  width: 28,
                  height: 28,
                  borderRadius: '20%',
                  bgcolor: 'red',
                  color: 'white',
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  fontSize: 18,
                  '&:hover': { bgcolor: '#cc0000' }
                }}
              >
                -
              </Button>
              {/*
              <Button
                onClick={() => editarproducto(item.id)}
                sx={{
                  minWidth: 0,
                  position: 'absolute',
                  top: 8,
                  left: 8,
                  bgcolor: 'grey.200',
                  borderRadius: 1,
                  px: 1,
                  textTransform: 'none',
                  fontSize: '0.75rem'
                }}
              >
                Edit
              </Button>
              */}

              <CardMedia
                component="img"
                image={item.img}
                alt={item.nombre}
                sx={{ height: 420, objectFit: 'contain', cursor: 'pointer', borderRadius: 2 }}
                onClick={() => irADetalle(item.id)}
              />

              <CardContent>
                <Typography textAlign="center" fontWeight="bold" mt={1}>
                  {item.nombre}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid mt={6}>
        <Button
          onClick={agregarProducto}
          sx={{
            minWidth: 0,
            width: 45,
            height: 45,
            borderRadius: '20%',
            bgcolor: 'green',
            margin: '0 auto',
            color: 'white',
            fontSize: 26,
            '&:hover': { bgcolor: '#0f7a14' },
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          +
        </Button>
      </Grid>
    </Box>
  ): (<Box></Box>);
}