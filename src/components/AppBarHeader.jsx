import { AppBar, Toolbar, Typography, InputBase, Box, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppContext } from '../context/AppContext';
import { useAuth0 } from "@auth0/auth0-react";

export default function AppBarHeader() {
   const { user, loginWithRedirect, logout, isAuthenticated} = useAppContext();
  return (
    <AppBar position="static" sx={{ bgcolor: '#b4893e', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchIcon sx={{ mr: 1 }} />
          <InputBase placeholder="Search..." sx={{ color: 'white' }} />
        </Box>

        {isAuthenticated ? (
          <Avatar
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            sx={{ bgcolor: 'white', color: '#b4893e', cursor: 'pointer' }}
            alt={user.name}
            src={user.picture}
          />
        ) : (
          <Avatar
            onClick={() => loginWithRedirect()}
            sx={{ bgcolor: 'white', color: '#b4893e', cursor: 'pointer' }}
          />
        )}
      </Toolbar>
    </AppBar>
  );
}
