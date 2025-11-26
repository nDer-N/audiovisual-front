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

export default function SalonesPage({ cotol }) {
    const { id } = useParams();
    const [errorDisponibilidad, setErrorDisponibilidad] = useState(false);
    const salones = cotol.find((p) => p._id === id);
    const [available, setAvailable] = useState(1);
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [finalDay, setFinalDay] = useState(null);
    const [openTerms, setOpenTerms] = useState(false);
    const [acepto, setAcepto] = useState(false);
    const fechactual = dayjs();
    const navigate = useNavigate();
    const { user, setReser } = useAppContext();
    const handleClick = (id) => {
        navigate(`/confirmacion-del-salon/${id}`);
    };

    function normalizeUTC(date) {
        const d = new Date(date);
        d.setUTCHours(0, 0, 0, 0);
        return d.toISOString();
    }

    async function getReservations(roomId, dateStart, dateEnd) {
        try {
            const res = await fetch(
                `http://localhost:8000/api/reservas/salones/${roomId}/${dateStart}/${dateEnd}`
            );

            if (!res.ok) throw new Error("Error al obtener reservas");

            const data = await res.json();

            return data;

        } catch (err) {
            console.error(err);
            return [];
        }
    }





    const agregarReserva = async (nueva) => {
        try {
            const { isRoom, ...soloBack } = nueva;

            const res = await fetch("http://localhost:8000/api/reservas/salones/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(soloBack)
            });

            if (!res.ok) {
                setErrorDisponibilidad(true);
                return;
            }

            const data = await res.json();
            console.log("Reserva creada:", data);


            setReser(prev => [...prev, nueva]);

            handleClick(id);

        } catch (error) {
            console.error("Error POST:", error);
            setErrorDisponibilidad(true);
        }
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
                        src={salones.img}
                        alt={salones.name}
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
                        {salones.name}
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                        {salones.description}
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

                                const nuevaReserva = {
                                    description: salones.description,
                                    roomId: salones._id,
                                    user: user?.email ?? "desconocido",
                                    dateStart: selectedDate,
                                    dateEnd: finalDay,
                                    available: available,
                                    status: "proceso",
                                    isRoom: true,
                                };
                                agregarReserva(nuevaReserva);
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
                                onChange={async (value) => {
                                    const start = normalizeUTC(value[0]);
                                    const end = normalizeUTC(value[1]);

                                    setSelectedDate(start);
                                    setFinalDay(end);
                                     

                                    const overlap = await getReservations(salones._id, start, end);

                                    console.log("Reservas:", overlap);
                                    const total = overlap.length;
                                    
                                    if (total > 0) {
                                        setAvailable(0);
                                    } else {
                                        setAvailable(1);
                                    }

                                    setErrorDisponibilidad(false);



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
                                Usted se compromete a no dañar de ninguna manera la instalacion que
                                tomo prestada y que al momento de hacer su devolucion
                                esta este en el mismo estado como la recibio.
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
            {errorDisponibilidad && (
                <Box
                    sx={{
                        position: "fixed",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 2000,
                        width: "350px",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#ffcccc",
                            borderLeft: "6px solid red",
                            padding: 3,
                            borderRadius: 2,
                            textAlign: "center",
                            boxShadow: 4,
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" color="red">
                            No hay disponibilidad
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                            No hay disponibilidad en las fechas seleccionadas.
                        </Typography>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "red",
                                mt: 2,
                                "&:hover": { backgroundColor: "#aa0000" }
                            }}
                            onClick={() => setErrorDisponibilidad(false)}
                        >
                            Aceptar
                        </Button>
                    </Box>
                </Box>
            )}


        </Grid>
    );
}