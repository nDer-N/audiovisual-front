import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import BlockIcon from "@mui/icons-material/Block";

export default function AccessDenied() {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
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
          maxWidth: 450,
          borderRadius: 3,
          boxShadow: 4,
          textAlign: "center",
          p: 3,
        }}
      >
        <CardContent>
          <BlockIcon
            sx={{
              fontSize: 80,
              color: "#781C2D",
              mb: 2,
            }}
          />

          <Typography variant="h4" gutterBottom>
            Acceso Denegado
          </Typography>

          <Typography variant="body1" sx={{ mb: 3, color: "gray.700" }}>
            Debes iniciar sesión con un correo institucional que termine en{" "}
            <strong>@up.edu.mx</strong>
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#781C2D",
              color: "white",
              py: 1.4,
              fontSize: "1rem",
              borderRadius: 2,
              "&:hover": { bgcolor: "#5c1623" },
            }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
