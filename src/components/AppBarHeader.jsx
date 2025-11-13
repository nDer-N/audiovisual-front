import { AppBar, Toolbar, Typography, InputBase, Box, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppContext } from '../context/AppContext';

export default function AppBarHeader() {
  return (
    <AppBar position="static" sx={{ bgcolor: '#b4893e', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <SearchIcon sx={{ mr: 1 }} />
          <InputBase placeholder="Search..." sx={{ color: 'white' }} />
        </Box>
        <Avatar sx={{ bgcolor: 'white', color: '#b4893e' }} />
      </Toolbar>
    </AppBar>
  );
}
