import { useParams } from "react-router-dom";
import { Grid, Box, Typography, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function DetalleAdmin({catal}) {
    const { id } = useParams();
    const producto = catal.find((p) => p.id === Number(id));
    const navigate = useNavigate();

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
                    Producto Publico
                </div>
            </Grid>
            <Grid>
                <Box
                    sx={{
                        backgroundColor: "#fafafa",
                        padding: 3,
                        borderRadius: 3,
                        boxShadow: 3,
                        width:550
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        {producto.nombre}
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                        {producto.descripcion}
                    </Typography>
                    <Typography sx={{ mt: 3 }} fontWeight="bold">
                        Cantidad:
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>

                        <Typography>{producto.cantidad}</Typography>
                    </Box>
                </Box>
            </Grid>

        </Grid>
    );
}