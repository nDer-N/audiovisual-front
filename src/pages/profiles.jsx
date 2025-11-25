import React from "react";
import { Box, Grid, Typography, Card, CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
 // importa el archivo users.js

export default function Profiles({users}) {
   
    const navigate = useNavigate();
    const handleClick = (_id) => {
    navigate(`/informacio-de-los-perfiles/${_id}`);
  };

    return (
        <Box
            sx={{
                backgroundColor: "#f4eee5",
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                py: 6
            }}
        >
            <Box sx={{ width: "70%" }}>
                <Grid container direction="column" spacing={3}>
                    {users.map((user) => (
                        <Grid key={user.id}>
                            <Card
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    backgroundColor: "#ffffff",
                                    borderRadius: 2,
                                    boxShadow: 1,
                                }}
                            >
                                <CardActionArea
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        py: 2,
                                        px: 2
                                    }}
                                    onClick={() => handleClick(user.id)}
                                >
                                    {/* Imagen del usuario */}
                                    <Box
                                        component="img"
                                        src={user.img}
                                        alt={user.name}
                                        sx={{
                                            width: 70,
                                            height: 70,
                                            borderRadius: "50%",
                                            mr: 3
                                        }}
                                    />

                                    {/* Nombre */}
                                    <Typography sx={{ fontSize: "1.2rem" }}>
                                        {user.name}
                                    </Typography>

                                    {/* Flecha al lado derecho */}
                                    <Box sx={{ flexGrow: 1 }} />

                                    <Typography sx={{ fontSize: "1.5rem", color: "#777" }}>
                                        ›
                                    </Typography>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
