import React from 'react'
import { useParams } from "react-router-dom";
import { Grid, Box, Typography, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import productos from './productos';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext';




export default function Itempage() {
    const { id } = useParams();
    const producto = productos.find((p) => p.id === Number(id));
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [openTerms, setOpenTerms] = useState(false);
    const [acepto, setAcepto] = useState(false);
    const [cantida, setCantidad] = React.useState(1);
    const fechactual = dayjs();
    const navigate = useNavigate();
    const { setReser } = useAppContext();
    const handleClick = (id) => {
        navigate(`/confirmacion/${id}`);
    };


    return (
        <Grid container spacing={4} sx={{ padding: 4 }}>
            <Grid>
                <Box
                    sx={{
                        backgroundColor: "#fafafa",
                        padding: 15,
                        borderRadius: 15,
                        boxShadow: 15
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
                    <Typography sx={{ mt: 3 }} fontWeight="bold">
                        Cantidad:
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                        <Button
                            variant="outlined"
                            onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                        >
                            -
                        </Button>

                        <Typography>{cantida}</Typography>

                        <Button
                            variant="outlined"
                            onClick={() => setCantidad(prev => Math.min(producto.cantidad, prev + 1))}
                        >
                            +
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <Button variant="contained" sx={{ paddingX: 4, backgroundColor: selectedDate ? "#4caf50" : undefined }} onClick={() => setShowCalendar(!showCalendar)} >
                        Calendario de Reservas
                    </Button>
                    <Button variant="contained" sx={{ paddingX: 4, backgroundColor: acepto ? "#4caf50" : undefined }} onClick={() => setOpenTerms(true)}>
                        Leer términos y condiciones
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ paddingX: 4 }}
                        onClick={() => {
                            if (!selectedDate) {
                                alert("Debes elegir una fecha antes de continuar.");
                                return;
                            }
                            if (!acepto) {
                                alert("Debes aceptar los términos y condiciones.");
                                return;
                            }
                            else {
                                setReser({
                                    id: producto.id,
                                    fecha: selectedDate,
                                    cantidad: cantida
                                });
                                handleClick(id);
                            }


                        }}
                    >
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
                        <Button variant='contained' sx={{ mt: 4 }} onClick={() => setShowCalendar(false)}>Hecho</Button>
                    </Box>

                )}
                {openTerms && (
                    <Dialog
                        open={openTerms}
                        onClose={() => setOpenTerms(false)}
                        slotProps={{
                            paper: {
                                sx: {
                                    borderRadius: 3,
                                    padding: 2,
                                    backgroundColor: "#ffffff",
                                    width: "500px",
                                }
                            }
                        }}
                    >
                        <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                            Términos y Condiciones
                        </DialogTitle>

                        <DialogContent>
                            <Typography sx={{ mt: 1, lineHeight: 1.6 }}>
                                Usted se compromete a regresar los materiales que pida prestados
                                sin ningún rasguño y en las mejores condiciones posibles.
                                Cualquier daño podrá generar una sanción o costo adicional.
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                                <input
                                    type="checkbox"
                                    id="acepto"
                                    onChange={(e) => setAcepto(e.target.checked)}
                                    style={{ transform: "scale(1.3)", marginRight: "10px" }}
                                />
                                <label htmlFor="acepto" style={{ fontSize: "1rem" }}>
                                    Acepto las condiciones
                                </label>
                            </Box>

                            <Button
                                variant="contained"
                                sx={{ mt: 3 }}
                                disabled={!acepto}
                                onClick={() => setOpenTerms(false)}
                                fullWidth
                            >
                                Confirmar
                            </Button>
                        </DialogContent>
                    </Dialog>
                )}
            </Grid>

        </Grid>
    );
}