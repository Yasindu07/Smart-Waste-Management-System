import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Grid, FormControl, FormGroup, FormControlLabel, Checkbox, Chip } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
// import CustomAppBar from './CustomAppBar'; // Adjust path as needed
import RecyclingIcon from '@mui/icons-material/Recycling';
import GrassIcon from '@mui/icons-material/Grass';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useDispatch, useSelector } from "react-redux";

const Collecting = () => {
  const { id } = useParams(); // Get ID from URL parameters
  const { currentUser } = useSelector((state) => state.user); // Get current user from Redux store
  const navigate = useNavigate();
  const [weight, setWeight] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const typeString = selectedTypes.join(', '); // Combine selected types into a string

    try {
      await axios.put(`http://localhost:5002/api/schedules/${id}`, {
        status: 'done',
        weight,
        type: typeString,
        garbageCollectorId: currentUser.username,
        // Pass user ID to the backend
      });
      setMessage('Schedule updated successfully!');
      
      // Redirect to schedules page after success
      setTimeout(() => {
        navigate('/schedules');
      }, 2000);
    } catch (err) {
      console.error('Error updating schedule:', err);
      setError('Failed to update the schedule. Please try again.');
    }
  };

  return (
    <Box>
      {/* <CustomAppBar name="Collecting" showBackButton={true} showMenu={true} /> */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { xs: '5px', md: '40px' },
          minHeight: 'calc(100vh - 64px)', // Adjust for AppBar height
          backgroundColor: '#f0f4f3',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            padding : {xs: 5 , md: 10}
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ marginBottom: '8px', fontWeight: 'bold', color: 'gray' }}>
                Enter Weight
              </Typography>
              <TextField
                label="Weight (kg)"
                variant="outlined"
                type="number"
                fullWidth
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl component="fieldset">
                <Typography variant="body1" sx={{ marginBottom: '8px', fontWeight: 'bold', color: 'gray' }}>
                  Select Types
                </Typography>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedTypes.includes('Organic')}
                        onChange={() => handleTypeChange('Organic')}
                        icon={<GrassIcon />}
                        checkedIcon={<GrassIcon color="primary" />}
                      />
                    }
                    label="Organic"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedTypes.includes('NonRecycle')}
                        onChange={() => handleTypeChange('NonRecycle')}
                        icon={<DeleteSweepIcon />}
                        checkedIcon={<DeleteSweepIcon color="primary" />}
                      />
                    }
                    label="NonRecycle"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedTypes.includes('Recycle')}
                        onChange={() => handleTypeChange('Recycle')}
                        icon={<RecyclingIcon />}
                        checkedIcon={<RecyclingIcon color="primary" />}
                      />
                    }
                    label="Recycle"
                  />
                </FormGroup>
              </FormControl>
            </Grid>

            {selectedTypes.length > 0 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Selected Types:
                  </Typography>
                  {selectedTypes.map((type) => (
                    <Chip
                      key={type}
                      label={type}
                      sx={{
                        backgroundColor: '#4caf50',
                        color: '#ffffff',
                      }}
                      onDelete={() => handleTypeChange(type)}
                    />
                  ))}
                </Box>
              </Grid>
            )}

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#388e3c',
                  color: '#fff',
                  paddingX: '32px',
                  paddingY: '8px',
                  '&:hover': {
                    backgroundColor: '#2e7d32',
                  },
                }}
              >
                Submit
              </Button>
            </Grid>

            {message && (
              <Grid item xs={12}>
                <Alert severity="success">{message}</Alert>
              </Grid>
            )}

            {error && (
              <Grid item xs={12}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Collecting;