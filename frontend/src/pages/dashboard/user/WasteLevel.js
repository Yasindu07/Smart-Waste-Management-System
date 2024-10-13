import React from 'react';
import { Box, Typography, Paper, CircularProgress, Grid2, IconButton } from '@mui/material';
import RecyclingIcon from '@mui/icons-material/Recycling';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

// Sample data for waste levels (values are in percentage)
const wasteData = {
  organic: 60,
  recyclable: 40,
  nonRecyclable: 20,
};

const WasteLevelCard = ({ title, level, icon, color }) => {
  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, textAlign: 'center' }}>
      <IconButton sx={{ fontSize: 50, color: color }}>
        {icon}
      </IconButton>
      <Typography variant="h6" sx={{ marginY: 1 }}>{title}</Typography>
      <CircularProgress 
        variant="determinate" 
        value={level} 
        size={100} 
        thickness={5} 
        sx={{ color: color }}
      />
      <Typography variant="h6" sx={{ marginY: 1 }}>{level}%</Typography>
    </Paper>
  );
};



const WasteLevel = () => {
  return (
    <Box sx={{ padding: 3 }}>
    <Typography variant="h4" gutterBottom textAlign="center">
      Current Waste Levels
    </Typography>

    {/* Waste Levels Overview */}
    <Grid2 container spacing={3} sx={{ marginTop: 2 }}>
      {/* Organic Waste Level */}
      <Grid2 xs={12} sm={4}>
        <WasteLevelCard 
          title="Organic Waste" 
          level={wasteData.organic} 
          icon={<WaterDropIcon />} 
          color="#4caf50"  // Green color for organic
        />
      </Grid2>

      {/* Recyclable Waste Level */}
      <Grid2 xs={12} sm={4}>
        <WasteLevelCard 
          title="Recyclable Waste" 
          level={wasteData.recyclable} 
          icon={<RecyclingIcon />} 
          color="#2196f3"  // Blue color for recyclable
        />
      </Grid2>

      {/* Non-Recyclable Waste Level */}
      <Grid2 xs={12} sm={4}>
        <WasteLevelCard 
          title="Non-Recyclable Waste" 
          level={wasteData.nonRecyclable} 
          icon={<DeleteOutlineIcon />} 
          color="#f44336"  // Red color for non-recyclable
        />
      </Grid2>
    </Grid2>
  </Box>
  )
}

export default WasteLevel