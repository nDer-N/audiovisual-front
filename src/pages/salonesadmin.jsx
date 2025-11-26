import React from 'react';
import { useState, useEffect } from 'react';
import { Box, Grid, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { useAppContext } from '../context/AppContext';

export default function SalonesAdmin({ cotol, setCotol }) {
    const navigate = useNavigate();
    const { isAdmin } = useAppContext();

    const eliminarProducto = async (id) => {
        const confirmacion = window.confirm("¿Seguro que quieres eliminar este salón?");
        if (!confirmacion) return;

        try {
            const res = await fetch(`http://localhost:8000/api/rooms/${id}`, {
                method: "DELETE"
            });

            if (!res.ok) {
                const data = await res.json();
                alert("Error: " + data.message);
                return;
            }

            // Actualizar el estado local
            setCotol(prev => prev.filter(item => item._id !== id));

        } catch (err) {
            console.error(err);
            alert("Hubo un error al eliminar el salón.");
        }
    };

    const irADetalle = (id) => {
        navigate(`/detalle-salon/${id}`);
    };

    const agregarProducto = () => {
        navigate('/agregar-salones');
    };

    async function loadSalones() {
        const res = await fetch("http://localhost:8000/api/rooms");
        const data = await res.json();
        setCotol(data);
    }

    useEffect(() => {
        loadSalones();
    }, []);

    return isAdmin ? (
        <Box p={4}>
            <Grid container spacing={7} justifyContent="center">
                {cotol.map((item) => (
                    <Grid key={item._id}>
                        <Card sx={{ p: 2, position: 'relative', borderRadius: 3, boxShadow: 3 }}>
                            <Button
                                onClick={() => eliminarProducto(item._id)}
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

                            <CardMedia
                                component="img"
                                image={item.img}
                                alt={item.name}
                                sx={{ height: 420, objectFit: 'contain', cursor: 'pointer', borderRadius: 2 }}
                                onClick={() => irADetalle(item._id)}
                            />

                            <CardContent>
                                <Typography textAlign="center" fontWeight="bold" mt={1}>
                                    {item.name}
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
    ) : (<Box></Box>);
}
