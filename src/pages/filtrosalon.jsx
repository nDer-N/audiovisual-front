import { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import {getreservasSalon} from "./reservacionSalon"
import { useAppContext } from "../context/AppContext";

export default function ReservasSalon() {

  const { user } = useAppContext(); // ← asegúrate que aquí tienes user.username o user.email
  const [reservasSalon, setReservasSalon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomNames, setRoomNames] = useState({});
 

  async function getNameRoom(id) {
  try {
    const res = await fetch(`https://equipo1.ralejandro.com/api/rooms/${id}`);
    
    if (!res.ok) {
      return "Sala no encontrada";
    }

    const data = await res.json();

    if (!data || !data.name) {
      return "Sala desconocida";
    }

    return data.name;

  } catch (err) {
    console.error("Error al cargar sala:", err);
    return "Error al cargar sala";
  }
}


  useEffect(() => {
    async function loadNamesR() {
      const names = {};

      for (const item of reservasSalon) {
        if (!roomNames[item.roomId]) {
          const name = await getNameRoom(item.roomId);
          console.log(name, item.roomId);
          names[item.roomId] = name;
        }
      }

      if (Object.keys(names).length > 0) {
        setRoomNames(prev => ({ ...prev, ...names }));
      }
    }

    if (reservasSalon.length > 0) {
      loadNamesR();
    }
  }, [reservasSalon]);


  useEffect(() => {

    async function cargarReservas() {
      try {
        if (!user) return;

        const data = await getreservasSalon(user.email); 
        setReservasSalon(data);
        console.log(data);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
      } finally {
        setLoading(false);
      }
    }

    cargarReservas();
  }, [user]);

  if (loading) {
    return <Typography textAlign="center" mt={4}>Cargando reservas...</Typography>;
  }

  return (
    <Box p={4} sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "85%", bgcolor: "#eee9df", borderRadius: 3, p: 4 }}>

        {reservasSalon.length === 0 ? (
          <Typography variant="h5" textAlign="center" mt={4}>
            No tienes ninguna reserva.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {reservasSalon.map((item) => (
              <Grid item key={item._id} xs={12} md={8}>
                <Card sx={{ p: 2, borderRadius: 3 }}>
                  <CardContent>

                    <Typography variant="h5" fontWeight="bold" mb={1}>
                     {roomNames[item.roomId] || "Cargando..."}
                    </Typography>


                    <Typography variant="body1" mb={1}>
                      <strong>Inicio:</strong>{" "}
                      {new Date(item.dateStart).toLocaleString()}
                    </Typography>

                    <Typography variant="body1" mb={1}>
                      <strong>Fin:</strong>{" "}
                      {new Date(item.dateEnd).toLocaleString()}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        color:
                          item.status === "accepted"
                            ? "green"
                            : item.status === "proceso"
                            ? "orange"
                            : "red",
                      }}
                    >
                      Estado: {item.status}
                    </Typography>

                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
