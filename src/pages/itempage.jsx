import React from 'react'
import { useParams } from "react-router-dom";
import { Grid, Box, Typography, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";





export default function Itempage({ catal }) {
    const { id } = useParams();
    const producto = catal.find((p) => p.id === Number(id));
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [finalDay, setFinalDay] = useState(null);
    const [openTerms, setOpenTerms] = useState(false);
    const [acepto, setAcepto] = useState(false);
    const [cantida, setCantidad] = React.useState(1);
    const fechactual = dayjs();
    const navigate = useNavigate();
    const { user, setReser } = useAppContext();
    const handleClick = (id) => {
        navigate(`/confirmacion/${id}`);
        console.log(finalDay);
    };
    const agregarReserva = (nueva) => {
        setReser(prev => {
            const existente = prev.find(r =>
                r.id === nueva.id &&
                r.day === nueva.day &&
                r.month === nueva.month &&
                r.year === nueva.year &&
                r.user === nueva.user
            );

            if (existente) {
                return prev.map(r =>
                    r.id === nueva.id &&
                        r.user === nueva.user &&
                        r.day === nueva.day &&
                        r.month === nueva.month &&
                        r.year === nueva.year
                        ? { ...r, quantity: r.quantity + nueva.quantity }
                        : r
                );
            }
            return [...prev, nueva];
        });
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
                        alt={producto.name}
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
                        {producto.name}
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                        {producto.description}
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
                            onClick={() => setCantidad(prev => Math.min(producto.quantity, prev + 1))}
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
                                const dia = selectedDate.getDate();
                                const mes = selectedDate.getMonth() + 1;
                                const año = selectedDate.getFullYear();

                                const diafinal = finalDay.getDate();
                                const mesfinal = finalDay.getMonth() + 1;
                                const añofinal = finalDay.getFullYear();
                                agregarReserva({
                                    id: producto.id,
                                    date: selectedDate,
                                    finaldate: finalDay,
                                    quantity: cantida,
                                    day: dia,
                                    finalday: diafinal,
                                    month: mes,
                                    finalmonth: mesfinal,
                                    year: año,
                                    finalyear: añofinal,
                                    name: producto.name,
                                    description: producto.description,
                                    image: producto.img,
                                    user: user?.email ?? "desconocido",
                                    isRoom: false,
                                    status: "Proceso"
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
                            <Calendar
                                selectRange={true}
                                onChange={(value) => {
                                    setSelectedDate(new Date(value[0]));
                                    setFinalDay(new Date(value[1]));
                                }}
                                value={[selectedDate || null, finalDay || null]}
                            />
                        </LocalizationProvider>
                        <Typography sx={{ mt: 1 }}>
                            Fecha actual: {JSON.stringify(fechactual)}
                        </Typography>

                        {selectedDate && finalDay && (
                            <Typography sx={{ mt: 2 }}>
                                Rango seleccionado: {JSON.stringify(selectedDate)} → {JSON.stringify(finalDay)}
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