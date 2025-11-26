import { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { getreservasProducto } from "./reservacionProducto";
import { useAppContext } from "../context/AppContext";

export default function ReservasSalon() {

  const { user } = useAppContext();
  const [reservasProducto, setReservasProducto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productNames, setProductNames] = useState({});
  const [productImgs, setProductImgs] = useState({});

  async function getNameProduct(id) {
    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`);

      if (!res.ok) return "Producto no encontrado";

      const data = await res.json();
      return data?.name || "Producto desconocido";

    } catch {
      return "Error al cargar el producto";
    }
  }

  async function getImgProduct(id) {
    try {
      const res = await fetch(`http://localhost:8000/api/products/${id}`);

      if (!res.ok) return "";

      const data = await res.json();
      return data?.img || "";

    } catch {
      return "";
    }
  }

  useEffect(() => {
    async function loadNames() {
      const names = {};

      for (const item of reservasProducto) {
        if (!productNames[item.productId]) {
          const name = await getNameProduct(item.productId);
          names[item.productId] = name;
        }
      }

      if (Object.keys(names).length > 0) {
        setProductNames(prev => ({ ...prev, ...names }));
      }
    }

    if (reservasProducto.length > 0) {
      loadNames();
    }
  }, [reservasProducto]);

  useEffect(() => {
    async function loadImgs() {
      const imgs = {};

      for (const item of reservasProducto) {
        if (!productImgs[item.productId]) {
          const img = await getImgProduct(item.productId);
          imgs[item.productId] = img;
        }
      }

      if (Object.keys(imgs).length > 0) {
        setProductImgs(prev => ({ ...prev, ...imgs }));
      }
    }

    if (reservasProducto.length > 0) {
      loadImgs();
    }
  }, [reservasProducto]);

  useEffect(() => {
    async function cargarReservas() {
      try {
        if (!user) return;

        const data = await getreservasProducto(user.email);
        setReservasProducto(data);
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

        {reservasProducto.length === 0 ? (
          <Typography variant="h5" textAlign="center" mt={4}>
            No tienes ninguna reserva.
          </Typography>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {reservasProducto.map((item) => (
              <Grid item key={item._id} xs={12} md={8}>
                <Card sx={{ p: 2, borderRadius: 3 }}>
                  <CardContent>

                    {/* GRID PARA IMAGEN + TEXTO */}
                    <Grid container spacing={2} alignItems="center">

                      {/* IMAGEN DEL PRODUCTO */}
                      <Grid item xs={12} sm={4}>
                        <img
                          src={productImgs[item.productId]}
                          alt={productNames[item.productId]}
                          style={{
                            width: "100%",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "10px"
                          }}
                        />
                      </Grid>

                      {/* INFORMACIÓN */}
                      <Grid item xs={12} sm={8}>
                        <Typography variant="h5" fontWeight="bold" mb={1}>
                          {productNames[item.productId] || "Cargando..."}
                        </Typography>

                        <Typography variant="body1" mb={1}>
                          <strong>Inicio:</strong>{" "}
                          {new Date(item.dateStart).toLocaleString()}
                        </Typography>

                        <Typography variant="body1" mb={1}>
                          <strong>Fin:</strong>{" "}
                          {new Date(item.dateEnd).toLocaleString()}
                        </Typography>

                        <Typography variant="body1" mb={1}>
                          <strong>Cantidad:</strong> {item.quantity}
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
                      </Grid>

                    </Grid>

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
