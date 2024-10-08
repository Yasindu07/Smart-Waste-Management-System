// components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ open, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    onClose(); // Close the drawer after navigation
  };

  const isActive = (path) => location.pathname === path || (path === '/dashboard' && location.pathname === '/');
  
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListItem 
          button 
          onClick={() => handleNavigation('/dashboard')}
          sx={{
            backgroundColor: isActive('/dashboard') ? 'lightblue' : 'transparent',
          }}
        >
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleNavigation('./profile')}
          sx={{
            backgroundColor: isActive('/dashboard/profile') ? 'lightblue' : 'transparent',
          }}
        >
          <ListItemIcon><ProfileIcon /></ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
