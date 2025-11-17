import { Button, Box, Typography, Card, CardContent, Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginPage() {
  const { loginWithRedirect } = useAuth0();

  const loginAlumno = () => {
    loginWithRedirect({ appState: { role: "alumno" } });
  };

  const loginAdmin = () => {
    loginWithRedirect({ appState: { role: "admin" } });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 3,
          boxShadow: 4,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Bienvenido
          </Typography>

          <Typography variant="body1" align="center" sx={{ mb: 4, color: "gray.700" }}>
            Selecciona tu tipo de acceso
          </Typography>

          <Stack spacing={2}>
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
              Entrar como Alumno
            </Button>

            <Button
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#b4893e",
                color: "white",
                py: 1.4,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#946f32" },
              }}
              onClick={loginAdmin}
            >
              Entrar como Administrador
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
