import { useParams } from "react-router-dom";
import { Grid, Box, Typography, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function DetalleSalonAdmin({ cotol }) {
    const { id } = useParams();
    const salon = cotol.find((p) => p._id === id);
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
                        src={salon.img}
                        alt={salon.name}
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
                        alignItems:"center",
                        color: "white",
                        borderRadius: "8px",
                        fontSize: "1.2rem",
                        fontWeight: "500",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
                    }}
                >
                    Salón Disponible
                </div>
            </Grid>
            <Grid>
                <Box
                    sx={{
                        backgroundColor: "#fafafa",
                        padding: 3,
                        borderRadius: 3,
                        boxShadow: 3,
                        width: 550
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        {salon.name}
                    </Typography>

                    <Typography sx={{ mt: 2 }}>
                        {salon.description}
                    </Typography>
                </Box>
            </Grid>

        </Grid>
    );
}