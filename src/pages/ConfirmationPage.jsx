import React from 'react'
import { useParams } from "react-router-dom";
import { Grid, Box, Typography, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import productos from './productos';
import { useNavigate } from "react-router-dom";
import { useAppContext } from '../context/AppContext';


export default function ConfirmationPage() {
    const { id } = useParams();
    const producto = productos.find((p) => p.id === Number(id));
    const navigate = useNavigate();
    const { reser } = useAppContext();
    console.log(reser);
    return (
        <Grid container spacing={4} sx={{ padding: 4 }}>
            <Grid>
                <Box
                    sx={{
                        backgroundColor: "#fafafa",
                        padding: 15,
                        borderRadius: 15,
                        boxShadow: 15
                    }}>
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
            </Grid>
            <Grid>
                   <Box
                    sx={{
                        backgroundColor: "#3b4d7a",
                        color: "white",
                        padding: "80px 60px",
                        borderRadius: "8px",
                        textAlign: "center",
                        fontSize: "1.8rem",
                        fontWeight: "600",
                        boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                        width: "100%",
                        maxWidth: "900px",
                        mb: 5
                    }}
                >
                    Producto agregado al carrito
                </Box>
             <Box 
                    sx={{ 
                        display: "flex", 
                        gap: 9, 
                        justifyContent: "center" 
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#e8ebf7",
                            color: "#3b4d7a",
                            justifyContent:"rigth",
                            boxShadow: 2,
                            textTransform: "none",
                            paddingX: 9,
                            "&:hover": { backgroundColor: "#dce0f3" }
                        }}
                        onClick={() => navigate("/reservar-equipo")}
                    >
                        Volver al catálogo ❯❯
                    </Button>

                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#e8ebf7",
                            color: "#3b4d7a",
                            justifyContent:"left",
                            boxShadow: 2,
                            textTransform: "none",
                            paddingX: 9,
                            "&:hover": { backgroundColor: "#dce0f3" }
                        }}
                        
                    >
                        Ir al carrito ❯❯
                    </Button>
                </Box>
            </Grid>
        </Grid>
        
    );
}
