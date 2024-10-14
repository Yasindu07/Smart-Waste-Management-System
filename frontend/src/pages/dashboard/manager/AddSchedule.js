import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

const AddSchedule = () => {
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [code, setCode] = useState('');
  const [special, setSpecial] = useState(false);
  const [error, setError] = useState('');
  const [trucks, setTrucks] = useState([]); // Store fetched trucks
  const [selectedTruck, setSelectedTruck] = useState(''); // Selected truck number
  const navigate = useNavigate();

  // Fetch truck numbers on component mount
  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/truck/');
        setTrucks(response.data); // Assuming the data is an array of truck objects
      } catch (err) {
        setError('Failed to fetch trucks.');
      }
    };

    fetchTrucks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!time || !address || !code || !selectedTruck) {
      setError('All fields are required.');
      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setError('Code must be a 6-digit number.');
      return;
    }

    try {
      await axios.post('http://localhost:5002/api/schedules', {
        time,
        address,
        code,
        special,
        truckNumber: selectedTruck, // Include the selected truck number
      });

      navigate('/dashboard/schedule');
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Failed to add schedule.'
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h6" align="center" gutterBottom>
          Add Schedule
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Time"
                type="datetime-local"
                fullWidth
                value={time}
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address (City Name)"
                type="text"
                fullWidth
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g., Horana"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="6-Digit Code"
                type="text"
                fullWidth
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                inputProps={{ maxLength: 6 }}
                required
              />
            </Grid>
            {/* Dropdown for selecting truck number */}
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Select Truck Number</InputLabel>
                <Select
                  value={selectedTruck}
                  onChange={(e) => setSelectedTruck(e.target.value)}
                >
                  {trucks.map((truck) => (
                    <MenuItem key={truck._id} value={truck.numberPlate}>
                      {truck.numberPlate}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={special}
                    onChange={(e) => setSpecial(e.target.checked)}
                    color="primary"
                  />
                }
                label="Mark as Special"
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error" align="center">
                  {error}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: 2 }}
                >
                  Add Schedule
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddSchedule;