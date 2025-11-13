import { Box, Typography, Link, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  // Verifica si NO estamos en la página principal
  const showBackButton = location.pathname !== '/';

  const handleGoHome = () => {
    navigate('/'); // redirige a Home.jsx
  };

  return (
    <Box
      sx={{
        bgcolor: '#781C2D',
        color: 'white',
        p: 2,
        textAlign: 'center',
        mt: 5,
        position: 'relative',
      }}
    >
      {/* Botón de regreso (solo aparece fuera del Home) */}
      {showBackButton && (
        <IconButton
          onClick={handleGoHome}
          sx={{
            position: 'absolute',
            left: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            '&:hover': { color: '#b4893e' },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      )}

      <Typography variant="body2">
        Escuela de comunicación contacto:
        <Link
          href="mailto:prestamocm@up.edu.mx"
          sx={{ color: 'white', ml: 1 }}
        >
          prestamocm@up.edu.mx
        </Link>
      </Typography>
    </Box>
  );
}
