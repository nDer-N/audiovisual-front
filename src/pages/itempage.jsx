import React from 'react'
import { useParams } from "react-router-dom";
import { Grid, Box, Typography, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import productos from './productos';
import { useState } from 'react';



export default function Itempage() {
    const { id } = useParams();
    const producto = productos.find((p) => p.id === Number(id));
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
     const [openTerms, setOpenTerms] = useState(false);
    const fechactual = dayjs();


    return (
        <Grid container spacing={4} sx={{ padding: 4 }}>
            <Grid>
                <Box
                    sx={{
                        backgroundColor: "#fafafa",
                        padding: 30,
                        borderRadius: 30,
                        boxShadow: 30
                    }}
                >
                    <img
                        src={producto.img}
                        alt={producto.nombre}
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain"
                        }}
                    />
                </Box>
                <div
                    style={{
                        width: "70%",
                        maxWidth: "600px",
                        margin: "40px auto 0",
                        backgroundColor: "#3b4d7a",
                        padding: "20px",
                        textAlign: "center",
                        color: "white",
                        borderRadius: "8px",
                        fontSize: "1.2rem",
                        fontWeight: "500",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                    }}
                >
                    Disclaimer
                </div>
            </Grid>
            <Grid>
                <Box
                    sx={{
                        backgroundColor: "#fafafa",
                        padding: 3,
                        borderRadius: 3,
                        boxShadow: 3
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        {producto.nombre}
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                        {producto.descripcion}
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                        Pasos Para Reservar:
                        <br /> 1. Elige Una Fecha
                        <br /> 2. Lee Y Acepta Términos Y Condiciones
                        <br /> 3. Agrega Al Carrito
                    </Typography>
                </Box>
                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <Button variant="contained" sx={{ paddingX: 4 }} onClick={() => setShowCalendar(!showCalendar)} >
                        Calendario de Reservas
                    </Button>
                    <Button variant="contained" onClick={() => setOpenTerms(true)}>
                        Leer términos y condiciones
                    </Button>
                    <Button variant="contained" sx={{ paddingX: 4 }}>
                        Agregar a Carrito
                    </Button>
                </Box>
                {showCalendar && (
                    <Box sx={{ mt: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                value={selectedDate}
                                onChange={(newDate) => setSelectedDate(newDate)}
                            />
                        </LocalizationProvider>
                        <Typography sx={{ mt: 1 }}>
                            Fecha actual: {JSON.stringify(fechactual)}
                        </Typography>

                        {selectedDate && (
                            <Typography sx={{ mt: 1 }}>
                                Fecha seleccionada: {JSON.stringify(selectedDate)}
                            </Typography>
                        )}
                        <Button variant='contained' sx={{mt:4}} onClick={()=>setShowCalendar(false)}>Hecho</Button>
                    </Box>

                )}
                {openTerms &&(
                    <Box sx={{mt:2, backgroundColor: "#fafafa",
                        padding: 3,
                        borderRadius: 3,
                        boxShadow: 3}}>
                        <Typography sx={{mt:1}}>
                            Usted se compromete a regresar los materiales que pida prestados sin ningun rasguño y en las mejores condiciones que se puedan pedir
                        </Typography>
                        <Button variant='contained' sx={{mt:3}} onClick={()=>setOpenTerms(false)}>Acepto</Button>
                    </Box>
                )}
            </Grid>

        </Grid>
    );
}