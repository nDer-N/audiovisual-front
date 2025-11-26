import { Button, Box, Typography, Card, CardContent, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  const loginAlumno = () => {
    loginWithRedirect({ appState: { role: "alumno" } });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        backgroundImage:
          "url('https://buscandouniversidad.com/wp-content/uploads/2011/03/LOGO-UP.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "rgba(0,0,0,0.7)",
        backgroundBlendMode: "darken",
      }}
    >

      {/* Título perfectamente centrado */}
      <Typography
        variant="h3"
        sx={{
          color: "white",
          mb: 4,
          fontWeight: "bold",
          textShadow: "2px 2px 6px black",
          textAlign: "center",
        }}
      >
        Departamento de Audiovisuales
      </Typography>

      {/* Card centrado */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          boxShadow: 4,
          textAlign: "center",
          backdropFilter: "blur(6px)",
        }}
      >
        <CardContent
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Bienvenido
          </Typography>

          <Stack spacing={2} sx={{ width: "80%", maxWidth: 300 }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#781C2D",
                color: "white",
                py: 1.4,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#5c1623" },
              }}
              onClick={loginAlumno}
            >
              Iniciar Sesión
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
