import React from "react";

import { useSelector } from "react-redux";
import { Avatar, Typography, Paper, Button, Grid2 } from '@mui/material';



const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Paper 
      sx={{ 
        padding: { xs: 2, sm: 6 },  // Smaller padding for mobile, larger for desktop
        maxWidth: 800, 
        margin: 'auto', 
        backgroundColor: '#f9f9f9', 
        borderRadius: 2 
      }}
    >
      <Grid2 container spacing={3} direction="column" alignItems="center">
        {/* User Avatar */}
        <Grid2 item>
          <Avatar 
            alt={currentUser.name} 
            src={currentUser.profilePicture} 
            sx={{ 
              width: { xs: 80, sm: 100 },  // Smaller avatar for mobile
              height: { xs: 80, sm: 100 }, 
              marginBottom: 2 
            }} 
          />
        </Grid2>

        {/* User Information */}
        <Grid2 item>
          <Typography 
            variant="h4" 
            sx={{ 
              marginBottom: 1, 
              fontSize: { xs: '1.5rem', sm: '2rem' }  // Adjust font size for mobile
            }}
          >
            {currentUser.name}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              marginBottom: 2, 
              fontSize: { xs: '0.9rem', sm: '1rem' }  // Adjust font size for mobile
            }}
          >
            {currentUser.email}
          </Typography>
        </Grid2>

        {/* More details */}
        <Grid2 item container spacing={3} columns={16} sx={{alignItems:"center",justifyContent:"center"}}>
          <Grid2 item size={{ xs: 16, sm: 8 }}>
            <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Phone:</Typography>
            <Typography sx={{ color: 'text.primary' }}>
              {currentUser.phone || 'Not provided'}
            </Typography>
          </Grid2>
          <Grid2 item size={{ xs: 16, sm: 8 }}>
            <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Location:</Typography>
            <Typography sx={{ color: 'text.primary' }}>
              {currentUser.location || 'Not provided'}
            </Typography>
          </Grid2>
          <Grid2 item size={{ xs: 16, sm: 8 }}>
            <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Date of Birth:</Typography>
            <Typography sx={{ color: 'text.primary' }}>
              {currentUser.dob || 'Not provided'}
            </Typography>
          </Grid2>
          <Grid2 item size={{ xs: 16, sm: 8 }}>
            <Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Member Since:</Typography>
            <Typography sx={{ color: 'text.primary' }}>
              {new Date(currentUser.createdAt).toLocaleDateString() || 'N/A'}
            </Typography>
          </Grid2>
        </Grid2>

        {/* Edit Profile Button */}
        <Grid2 item>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 3, fontSize: { xs: '0.8rem', sm: '1rem' } }}  // Responsive button size
          >
            Edit Profile
          </Button>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default Profile;
