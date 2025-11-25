import { AppBar, Toolbar, InputBase, Box, Avatar } from '@mui/material'; 
import SearchIcon from '@mui/icons-material/Search';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from "react-router-dom";

export default function AppBarHeader() {
  const { user, loginWithRedirect, isAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate('/Usuario');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#b4893e', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchIcon sx={{ mr: 1 }} />
          <InputBase placeholder="Search..." sx={{ color: 'white' }} />
        </Box>

        {isAuthenticated ? (
          <Avatar
            onClick={handleAvatarClick}
            sx={{ bgcolor: 'white', color: '#b4893e', cursor: 'pointer' }}
            alt={user?.name}
            src={user?.picture}
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

