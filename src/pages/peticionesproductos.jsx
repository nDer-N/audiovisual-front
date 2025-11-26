import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Avatar,
    Popover
} from "@mui/material";
import { useNavigate } from "react-router";
import { useAppContext } from "../context/AppContext";

export default function PeticionesProductos({ catal, setCatal }) {
    const navigate = useNavigate();
    const [elements, setElements] = useState([]);
    const [productNames, setProductNames] = useState({});
    const [userNames, setUserNames] = useState({});
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userDetails, setUserDetails] = useState({});

    async function actualizarStatus(id, status) {
        const res = await fetch(`https://equipo1.ralejandro.com/api/reservas/${id}/status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });

        return await res.json();
    }

    async function getResProd() {
        const res = await fetch("https://equipo1.ralejandro.com/api/reservas/proc");
        return await res.json();
    }

    async function getName(id) {
        const res = await fetch(`https://equipo1.ralejandro.com/api/products/${id}`);
        const data = await res.json();
        return data.name;
    }


    async function getUser(user) {
        const res = await fetch(`https://equipo1.ralejandro.com/api/users/email/${user}`);
        const data = await res.json();
        return {
            img: data.img,
            name: data.name,
            warnings: data.warnings || [],
        };
    }

    useEffect(() => {
        async function loadInv() {
            const data = await getResProd();
            setElements(data);
        }
        loadInv();
    }, []);

    useEffect(() => {
        async function loadNames() {
            const names = {};

            for (const item of elements) {
                if (!productNames[item.productId]) {
                    const name = await getName(item.productId);
                    names[item.productId] = name;
                }
            }

            if (Object.keys(names).length > 0) {
                setProductNames(prev => ({ ...prev, ...names }));
            }
        }

        if (elements.length > 0) {
            loadNames();
        }
    }, [elements]);

    useEffect(() => {
        async function loadUsers() {
            const users = {};

            for (const item of elements) {
                if (!userNames[item.user]) {
                    const user = await getUser(item.user);
                    users[item.user] = user.img; // imagen para mostrar en avatar
                }
            }

            if (Object.keys(users).length > 0) {
                setUserNames(prev => ({ ...prev, ...users }));
            }
        }

        if (elements.length > 0) {
            loadUsers();
        }
    }, [elements]);


    const { reser, setReser } = useAppContext();
    const productos = reser.filter((r) => r.isRoom === false);


    const manejarStatus = async (id, status) => {
        try {
            await fetch(`https://equipo1.ralejandro.com/api/reservas/${id}/status`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            const updated = await getResProd();
            setElements(updated);

        } catch (err) {
            console.error("Error actualizando:", err);
        }
    };


    const handleAvatarClick = async (event, email) => {
        setAnchorEl(event.currentTarget);

        if (!userDetails[email]) {
            const details = await getUser(email);
            setUserDetails(prev => ({ ...prev, [email]: details }));
            setSelectedUser(details);
        } else {
            setSelectedUser(userDetails[email]);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    return (
        <Box p={4} sx={{ minHeight: "100vh", bgcolor: "#f3ede4" }}>
            <Button
                variant="contained"
                sx={{ mb: 3, bgcolor: "#1e88e5", fontWeight: "bold" }}
                onClick={() => navigate("/reservas-activas")}
            >
                Reservas Activas
            </Button>

            <Typography variant="h4" mb={4} fontWeight="bold" textAlign="center">
                Peticiones de Productos
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {elements.map((item) => (
                    <Grid key={item._id}>
                        <Card sx={{ p: 2, display: "flex", alignItems: "center", borderRadius: 3 }}>

                            <Avatar
                                sx={{ width: 64, height: 64, mr: 2, cursor: "pointer" }}
                                src={userNames[item.user]}
                                onClick={(e) => handleAvatarClick(e, item.user)}
                            />

                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" fontWeight="bold">
                                    {productNames[item.productId] || "Cargando..."}
                                </Typography>

                                <Typography variant="body1" color="text.secondary">
                                    {item.description}
                                </Typography>

                                <Typography variant="body1" mt={1}>
                                    <strong>Cantidad:</strong> {item.quantity}
                                </Typography>

                                <Typography variant="body1">
                                    <strong>Fecha de inicio:</strong> {item.dateStart}
                                </Typography>

                                <Typography variant="body1">
                                    <strong>Fecha de final:</strong> {item.dateEnd}
                                </Typography>

                                <Typography variant="body1">
                                    <strong>Usuario:</strong> {item.user}
                                </Typography>
                            </CardContent>

                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                <Button
                                    variant="contained"
                                    onClick={() => manejarStatus(item._id, "accepted")}
                                    sx={{
                                        bgcolor: item.status === "accepted" ? "#10b759" : "#28a745",
                                        width: item.status === "accepted" ? 150 : 100,
                                        transition: "0.3s",
                                        color: "white",
                                        fontWeight: "bold",
                                        "&:hover": { bgcolor: "#1f8f47" }
                                    }}
                                >
                                    {item.status === "accepted" ? "Aceptada" : "Accept"}
                                </Button>

                                <Button
                                    variant="contained"
                                    onClick={() => manejarStatus(item._id, "rechazado")}
                                    sx={{
                                        bgcolor: item.status === "rechazado" ? "#d11a1a" : "#e03535",
                                        width: item.status === "rechazado" ? 150 : 100,
                                        transition: "0.3s",
                                        color: "white",
                                        fontWeight: "bold",
                                        "&:hover": { bgcolor: "#b21212" }
                                    }}
                                >
                                    {item.status === "rechazado" ? "rechazado" : "Deny"}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>


            <Popover
    open={Boolean(anchorEl)}
    anchorEl={anchorEl}
    onClose={handleClose}
    anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
    }}
>
    {selectedUser && (
        <Box sx={{ p: 2, maxWidth: 250 }}>

            <Avatar
                src={selectedUser.img}
                sx={{ width: 80, height: 80, mx: "auto", mb: 1 }}
            />

            <Typography variant="h6" align="center" component="div">
                {selectedUser.name}
            </Typography>

            <Typography
                variant="body2"
                align="center"
                color="text.secondary"
                component="div"  
            >
                <strong>Warnings:</strong>

                {Array.isArray(selectedUser.warnings) && selectedUser.warnings.length > 0 ? (
                    selectedUser.warnings.map((w) => (
                        <Box
                            key={w._id}
                            sx={{ mt: 1, p: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}
                        >
                            <Typography variant="body2" component="div">
                                <strong>•</strong> {w.message}
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                                component="div"
                            >
                                {new Date(w.date).toLocaleDateString()}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" align="center" component="div" sx={{ mt: 1 }}>
                        Sin warnings
                    </Typography>
                )}
            </Typography>
        </Box>
    )}
</Popover>

        </Box>
    );
}
