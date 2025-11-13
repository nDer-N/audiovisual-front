import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon, // 👈 usamos este ícono para la "X"
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

export default function SideMenu() {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Inicio', path: '/' },
    { text: 'Equipo', path: '/reservar-equipo' },
    { text: 'Salones', path: '/reservar-salones' },
  ];

  return (
    <>
      {/* Botón hamburguesa / cerrar */}
      <IconButton
        color="inherit"
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          top: 16,
          left: 16,
          zIndex: (theme) => theme.zIndex.drawer + 2,
          bgcolor: '#b4893e',
          color: 'white',
          '&:hover': { bgcolor: '#946f32' },
          transition: 'all 0.3s ease',
        }}
      >
        {open ? <CloseIcon /> : <MenuIcon />} {/* 👈 cambia el ícono */}
      </IconButton>

      {/* Drawer colapsable */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // mejora rendimiento en móviles
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
            transition: 'transform 0.3s ease',
          },
        }}
      >
        <Toolbar />
        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle} // cierra el menú al hacer clic
              sx={{
                color: 'black',
                '&:hover': { backgroundColor: '#f0f0f0' },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
