import { createContext, useContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const { user: auth0User, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();
  const [reser, setReser] = useState({
    id: null,
    fecha: null,
    cantidad: 1,
  });


  // Estado local para guardar al usuario final ya procesado
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // ----------- Configuración global adicional (tuya) -------------
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [themeColor, setThemeColor] = useState("#b4893e");
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  // ----------- PROCESAR al usuario cuando Auth0 cambie -----------
  useEffect(() => {
    if (isAuthenticated && auth0User) {
      const processedUser = {
        name: auth0User.name,
        email: auth0User.email,
        picture: auth0User.picture,
      };

      setUser(processedUser);

      // Validar si es admin (email o claim)
      const adminEmails = ["admin@up.edu.mx"];

      const userIsAdmin =
        adminEmails.includes(auth0User.email) ||
        auth0User?.["https://up.edu.mx/role"] === "admin";

      setIsAdmin(userIsAdmin);
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  }, [isAuthenticated, auth0User]);

  return (
    <AppContext.Provider
      value={{
        // AUTH
        user,
        isAuthenticated,
        isLoading,
        isAdmin,
        loginWithRedirect,
        logout,

        // UI GLOBAL
        drawerOpen,
        toggleDrawer,
        themeColor,
        setThemeColor,
        reser,
        setReser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
