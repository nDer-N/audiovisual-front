import { Box, Grid } from '@mui/material';
import CardOption from '../components/CardOption';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const navigate = useNavigate();
  const {isAdmin} = useAppContext();
  {/*let options = [];*/}
  const meme = "https://upload.wikimedia.org/wikipedia/ru/thumb/a/a2/%D0%A1%D0%BF%D1%80%D0%B0%D0%B9%D1%82_%D0%A1%D0%B0%D0%BD%D1%81%D0%B0_%D0%B8%D0%B7_%D0%B8%D0%B3%D1%80%D1%8B_Undertale.png/274px-%D0%A1%D0%BF%D1%80%D0%B0%D0%B9%D1%82_%D0%A1%D0%B0%D0%BD%D1%81%D0%B0_%D0%B8%D0%B7_%D0%B8%D0%B3%D1%80%D1%8B_Undertale.png"
  {/*if (isAdmin) {
    options = [
      { title: 'Gestionar Equipo', image: meme, path: '/gestionar-equipo' },
      { title: 'Gestionar Salones', image: meme, path: '/gestionar-salones' },
      { title: 'Revisar Peticiones', image: meme, path: '/revisar-peticiones' },
      { title: 'Perfiles', image: meme, path: '/perfiles' },
    ]
  } else {
    options = [
      { title: 'Reservar Equipo', image: meme, path: '/reservar-equipo' },
      { title: 'Reservar Salones', image: meme, path: '/reservar-salones' },
      { title: 'Mis Reservas', image: meme, path: '/mis-reservas' },
      { title: 'FAQ’s', image: meme, path: '/faq' },
    ]
  };*/}
  const options = isAdmin
    ? [
      { title: 'Gestionar Equipo', image: meme, path: '/gestionar-equipo' },
      { title: 'Gestionar Salones', image: meme, path: '/gestionar-salones' },
      { title: 'Revisar Peticiones', image: meme, path: '/revisar-peticiones' },
      { title: 'Perfiles', image: meme, path: '/perfiles' },
    ]
    : [
      { title: 'Reservar Equipo', image: meme, path: '/reservar-equipo' },
      { title: 'Reservar Salones', image: meme, path: '/reservar-salones' },
      { title: 'Mis Reservas', image: meme, path: '/revisar-peticiones' },
      { title: 'FAQ’s', image: meme, path: '/faq' },
    ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <img
          src="https://static0.thegamerimages.com/wordpress/wp-content/uploads/2021/04/sans-sleeping-large.jpeg"
          alt="Banner"
          style={{ width: '100%', borderRadius: 10 }}
        />
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {options.map((opt) => (
          <Grid key={opt.title}>
            <CardOption {...opt} onClick={() => navigate(opt.path)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
