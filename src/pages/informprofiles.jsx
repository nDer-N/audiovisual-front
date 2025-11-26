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


export default function PerfilUsuario({ users }) {

    const { id } = useParams();
    console.log(id);
    const userQ = users.find((p) => p._id === id);
    console.log(userQ);

    const googleImg = userQ.img?.replace(/=s96-c$/, "=s400");

    const [advertencias, setAdvertencias] = useState(userQ.warnings || []);
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
    const confirmWarning = async () => {
        try {
            const res = await fetch(`https://equipo1.ralejandro.com/api/users/${id}/warnings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: detalleAdvertencia })
            });

            if (!res.ok) throw new Error("Error al guardar advertencia");

            const data = await res.json();

            setAdvertencias(data.user.warnings);

            closeWarningDialog();

        } catch (err) {
            console.error(err);
            alert("Hubo un error guardando la advertencia");
        }
    };

    const deleteWarning = async (warningId) => {
        try {
            const res = await fetch(`https://equipo1.ralejandro.com/api/users/${id}/warnings/${warningId}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Error eliminando warning");

            const data = await res.json();

            setAdvertencias(data.warnings);

        } catch (err) {
            console.error(err);
            alert("Hubo un error eliminando la advertencia");
        }
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
                            src={googleImg}
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
                                advertencias.map((a) => (
                                    <Box
                                        key={a._id}
                                        sx={{
                                            borderLeft: "4px solid #5d71dd",
                                            pl: 2,
                                            py: 1,
                                            mb: 1,
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center"
                                        }}
                                    >
                                        <Box>
                                            <Typography sx={{ fontWeight: 600 }}>{a.message}</Typography>
                                            <Typography sx={{ fontSize: 12, color: "gray" }}>
                                                {new Date(a.date).toLocaleString()}
                                            </Typography>
                                        </Box>

                                        {/* BOTÓN X */}
                                        <Button
                                            onClick={() => deleteWarning(a._id)}
                                            sx={{
                                                minWidth: "32px",
                                                color: "red",
                                                fontWeight: 900,
                                                fontSize: "18px"
                                            }}
                                        >
                                            ✕
                                        </Button>
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