import { createContext, useContext, useState } from 'react';

// Crear el contexto
const AppContext = createContext();

// Hook personalizado para usar el contexto
export const useAppContext = () => useContext(AppContext);

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Estudiante UP',
    email: 'prestamocm@up.edu.mx',
  });

  const [drawerOpen, setDrawerOpen] = useState(true);
  const [themeColor, setThemeColor] = useState('#b4893e');

  // Puedes agregar aquí cualquier otra variable global
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        drawerOpen,
        toggleDrawer,
        themeColor,
        setThemeColor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
