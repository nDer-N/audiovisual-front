import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography, Button, Avatar } from "@mui/material";
import { useAppContext } from "../context/AppContext";

export default function PeticionesProductos({ catal, setCatal }) {
    const [elements, setElements] = useState([]);
    const [productNames, setProductNames] = useState({});
    const [userNames, setUserNames] = useState({});

    async function getResProd() {
        const res = await fetch("http://localhost:8000/api/reservas/proc");
        return await res.json();
    }

    async function getName(id) {
        const res = await fetch(`http://localhost:8000/api/products/${id}`);
        const data = await res.json();
        return data.name;
    }

    async function getUser(user) {
        const res = await fetch(`http://localhost:8000/api/users/email/${user}`);
        const data = await res.json();
        console.log(data);
        return data.img;
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
                    users[item.user] = user;
                }
            }

            console.log(users);

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

    const manejarStatus = (id, status) => {
        setReser((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, status } : item
            )
        );
    };


    return (
        <Box p={4} sx={{ minHeight: "100vh", bgcolor: "#f3ede4" }}>
            <Typography variant="h4" mb={4} fontWeight="bold" textAlign="center">
                Peticiones de Productos
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {elements.map((item) => (
                    <Grid key={item._id}>
                        <Card sx={{ p: 2, display: "flex", alignItems: "center", borderRadius: 3 }}>

                            <Avatar sx={{ width: 64, height: 64, mr: 2 }} src={userNames[item.user]} />
                            

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
                                    onClick={() => manejarStatus(item._id, "denied")}
                                    sx={{
                                        bgcolor: item.status === "denied" ? "#d11a1a" : "#e03535",
                                        width: item.status === "denied" ? 150 : 100,
                                        transition: "0.3s",
                                        color: "white",
                                        fontWeight: "bold",
                                        "&:hover": { bgcolor: "#b21212" }
                                    }}
                                >
                                    {item.status === "denied" ? "Rechazada" : "Deny"}
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
