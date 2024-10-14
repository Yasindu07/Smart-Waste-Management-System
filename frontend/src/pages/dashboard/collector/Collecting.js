import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Grid, FormControl, FormGroup, FormControlLabel, Radio, RadioGroup, Chip } from '@mui/material';
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
  const [selectedType, setSelectedType] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.put(`http://localhost:5002/api/schedules/update/${id}`, {
        status: 'done',
        weight,
        type: selectedType,
        garbageCollectorId: currentUser.username,
      });
      setMessage('Schedule updated successfully!');
      
      // Redirect to schedules page after success
      setTimeout(() => {
        navigate('/dashboard/assigned-schedule');
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
            padding: { xs: 5, md: 10 },
            width: '100%', // Full width for the form
            maxWidth: '600px', // Limit max width
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
                  Select Type
                </Typography>
                <RadioGroup row value={selectedType} onChange={handleTypeChange}>
                  <FormControlLabel
                    value="Organic"
                    control={<Radio icon={<GrassIcon />} checkedIcon={<GrassIcon color="primary" />} />}
                    label="Organic"
                  />
                  <FormControlLabel
                    value="NonRecycle"
                    control={<Radio icon={<DeleteSweepIcon />} checkedIcon={<DeleteSweepIcon color="primary" />} />}
                    label="NonRecycle"
                  />
                  <FormControlLabel
                    value="Recycle"
                    control={<Radio icon={<RecyclingIcon />} checkedIcon={<RecyclingIcon color="primary" />} />}
                    label="Recycle"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            {selectedType && (
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
                    Selected Type:
                  </Typography>
                  <Chip
                    label={selectedType}
                    sx={{
                      backgroundColor: '#4caf50',
                      color: '#ffffff',
                    }}
                  />
                </Box>
              </Grid>
            )}

            <Grid item xs={12} sx={{ textAlign: 'center', marginTop: 'auto' }}>
            <Button
  type="submit"
  variant="contained"
  color="success"
  size="large"
  fullWidth
  sx={{
    paddingY: 1.5,
    borderRadius: 2,
    boxShadow: 3,
    fontSize: '1.1rem',
    mb: -20,
    mt: 38,
    // Styles for small screens (XS)
    '@media (max-width: 600px)': {
      width: '100%', // Full width on XS screens
    },
    // Styles for larger screens
    '@media (min-width: 600px)': {
      width: 'auto', // Reduce width for larger screens
      maxWidth: '300px', // Set a max width for the button
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