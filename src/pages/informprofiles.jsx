import { useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import users from "./users";

export default function PerfilUsuario() {
    const { id } = useParams();
    const userQ = users.find((p) => p.id === Number(id));

    const [advertencias, setAdvertencias] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [detalleAdvertencia, setDetalleAdvertencia] = useState("");

    // Abre el cuadro de diálogo
    const openWarningDialog = () => setOpenDialog(true);

    // Cierra el cuadro de diálogo
    const closeWarningDialog = () => {
        setDetalleAdvertencia("");
        setOpenDialog(false);
    };

    // Confirma y guarda la advertencia
    const confirmWarning = () => {
        const nueva = `Advertencia #${advertencias.length + 1}: ${detalleAdvertencia}`;
        setAdvertencias(prev => [...prev, nueva]);
        closeWarningDialog();
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f4efe7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 4,
            }}
        >
            <Card sx={{ width: "80%", maxWidth: 900, boxShadow: 4, borderRadius: 3 }}>
                <CardContent>

                    {/* Imagen */}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <img
                            src={userQ.image}
                            alt={userQ.name}
                            style={{
                                width: 180,
                                height: 180,
                                borderRadius: "50%",
                                objectFit: "cover",
                            }}
                        />
                    </Box>

                    {/* Nombre */}
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{ fontWeight: 600, borderBottom: "1px solid #ddd", pb: 2, mt: 2 }}
                    >
                        {userQ.name}
                    </Typography>

                    {/* Equipos */}
                    <Accordion sx={{ mt: 3, bgcolor: "#f8f4ef" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Equipos</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ color: "gray" }}>
                                Especificaciones generales.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* Salones */}
                    <Accordion sx={{ mt: 2, bgcolor: "#f8f4ef" }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="h6">Salones</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ color: "gray" }}>
                                Información sobre reservas de salones.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    {/* Advertencias */}
                    <Box
                        sx={{
                            borderRadius: 2,
                            border: "1px solid #ddd",
                            mt: 4,
                            bgcolor: "#f8f4ef",
                        }}
                    >
                        <Typography variant="h6" sx={{ p: 2, fontWeight: 600 }}>
                            Advertencias
                        </Typography>

                        <Divider />

                        <Box sx={{ p: 2 }}>
                            {advertencias.length === 0 ? (
                                <Typography sx={{ color: "gray", fontStyle: "italic" }}>
                                    Sin advertencias registradas.
                                </Typography>
                            ) : (
                                advertencias.map((a, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            borderLeft: "4px solid #5d71dd",
                                            pl: 2,
                                            py: 1,
                                            mb: 1,
                                        }}
                                    >
                                        <Typography>{a}</Typography>
                                    </Box>
                                ))
                            )}
                        </Box>
                    </Box>

                    {/* Botón */}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<WarningAmberIcon />}
                            onClick={openWarningDialog}
                            sx={{ px: 4, py: 1.5, borderRadius: 2 }}
                        >
                            Add Warning
                        </Button>
                    </Box>

                </CardContent>
            </Card>

            {/* ---- DIÁLOGO PARA ESCRIBIR ADVERTENCIA ---- */}
            <Dialog open={openDialog} onClose={closeWarningDialog} fullWidth maxWidth="sm">
                <DialogTitle>Nueva Advertencia</DialogTitle>

                <DialogContent>
                    <TextField
                        label="Detalle de la advertencia"
                        fullWidth
                        multiline
                        rows={3}
                        value={detalleAdvertencia}
                        onChange={(e) => setDetalleAdvertencia(e.target.value)}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeWarningDialog}>Cancelar</Button>
                    <Button
                        onClick={confirmWarning}
                        variant="contained"
                        color="error"
                        disabled={detalleAdvertencia.trim() === ""}
                    >
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}