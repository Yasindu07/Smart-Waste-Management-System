// components/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem, Box, Grid2 } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import MenuIcon from '@mui/icons-material/Menu';
import { logoutSuccess } from '../redux/user/userSlice';

const Header = ({ handleSidebarToggle }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  console.log(currentUser);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logoutSuccess());
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleSidebarToggle}>
          <MenuIcon sx={{
        display: { xs: 'block', md: 'none' }, // Drawer only on small screens
      }}/>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar alt={currentUser?.username} src={currentUser?.profilePicture} />
          </IconButton>
          <Grid2>
          <Typography variant='h6'>{currentUser?.username}</Typography>
          <Typography variant='subtitle2'>{currentUser?.role}</Typography>
          </Grid2>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
