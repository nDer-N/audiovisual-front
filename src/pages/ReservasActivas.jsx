import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Avatar,
    Button,
    Popover
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ReservasActivas() {
    const [elements, setElements] = useState([]);
    const [productNames, setProductNames] = useState({});
    const [userNames, setUserNames] = useState({});
    const [userDetails, setUserDetails] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();

    async function getActive() {
        const res = await fetch("https://equipo1.ralejandro.com/api/reservas/active");
        return await res.json();
    }

    async function getName(id) {
        const res = await fetch(`https://equipo1.ralejandro.com/api/products/${id}`);
        return (await res.json()).name;
    }

    async function getUser(email) {
        const res = await fetch(`https://equipo1.ralejandro.com/api/users/email/${email}`);
        const data = await res.json();
        return {
            img: data.img,
            name: data.name,
            warnings: data.warnings || []
        };
    }

    useEffect(() => {
        async function load() {
            const data = await getActive();
            setElements(data);
        }
        load();
    }, []);

    useEffect(() => {
        async function loadNames() {
            const map = {};
            for (const item of elements) {
                if (!productNames[item.productId]) {
                    map[item.productId] = await getName(item.productId);
                }
            }
            if (Object.keys(map).length > 0)
                setProductNames(prev => ({ ...prev, ...map }));
        }
        if (elements.length > 0) loadNames();
    }, [elements]);

    useEffect(() => {
        async function loadUsers() {
            const map = {};
            for (const item of elements) {
                if (!userNames[item.user]) {
                    const user = await getUser(item.user);
                    map[item.user] = user.img;
                    setUserDetails(prev => ({ ...prev, [item.user]: user }));
                }
            }
            if (Object.keys(map).length > 0)
                setUserNames(prev => ({ ...prev, ...map }));
        }
        if (elements.length > 0) loadUsers();
    }, [elements]);

    const handleAvatarClick = (event, email) => {
        setAnchorEl(event.currentTarget);
        setSelectedUser(userDetails[email]);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedUser(null);
    };

    return (
        <Box p={4} sx={{ minHeight: "100vh", bgcolor: "#e7f1ff" }}>
            
            <Button
                variant="outlined"
                sx={{ mb: 3 }}
                onClick={() => navigate(-1)}
            >
                ← Regresar
            </Button>

            <Typography variant="h4" textAlign="center" mb={4} fontWeight="bold">
                Reservas Activas Hoy
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

                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">
                                    {productNames[item.productId] || "Cargando..."}
                                </Typography>

                                <Typography variant="body2">Usuario: {item.user}</Typography>
                                <Typography variant="body2">Inicio: {item.dateStart}</Typography>
                                <Typography variant="body2">Fin: {item.dateEnd}</Typography>
                                <Typography variant="body2">Cantidad: {item.quantity}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* POPOVER */}
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

                        <Typography variant="h6" align="center">
                            {selectedUser.name}
                        </Typography>

                        <Typography variant="body2" align="center">
                            <strong>Warnings:</strong>
                        </Typography>

                        {selectedUser.warnings.length > 0 ? (
                            selectedUser.warnings.map((w) => (
                                <Box
                                    key={w._id}
                                    sx={{ mt: 1, p: 1, bgcolor: "#f5f5f5", borderRadius: 1 }}
                                >
                                    <Typography variant="body2"><strong>•</strong> {w.message}</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(w.date).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2" align="center">Sin warnings</Typography>
                        )}
                    </Box>
                )}
            </Popover>
        </Box>
    );
}
