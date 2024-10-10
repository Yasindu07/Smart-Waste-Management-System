import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Chip,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Grid,
  Grid2,
  OutlinedInput,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const AddSchedule = ({ onClose }) => {
  const [personals, setPersonals] = useState([]);
  const availablePersonals = ["Palitha Weerasinghe", "John Doe", "Jane Smith"]; // Sample list of personals

  const handlePersonalChange = (event) => {
    setPersonals(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add schedule submission logic here
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid2 container spacing={2} columns={16}>
        {/* Header with Close Icon */}
        <Grid2
          size={{ xs: 16 }}
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <h2>Add New Schedule</h2>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Grid2>

        {/* Select Date */}
        <Grid2 size={{ xs: 16, sm: 8 }}>
          <InputLabel shrink id="date-input">
            Select Date
          </InputLabel>
          <TextField
            fullWidth
            id="date-input"
            type="date"
            sx={{ mb: 2 }}
            // InputLabelProps={{
            //   shrink: false, // ensures that the date picker works correctly
            // }}
          />
        </Grid2>

        {/* Select Time */}
        <Grid2 size={{ xs: 6, sm: 8 }}>
          <InputLabel shrink htmlFor="time-input">
            Select Time
          </InputLabel>
          <TextField
            fullWidth
            id="time-input"
            type="time"
            sx={{ mb: 2 }}
            InputLabelProps={{
              shrink: true, // ensures proper styling for the time picker
            }}
          />
        </Grid2>

        {/* Truck Selection */}
        <Grid2 size={{ xs: 6, sm: 8 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="truck-select-label">Assign a Truck</InputLabel>
            <Select
              labelId="truck-select-label"
              id="truck-select"
              label="Assign a Truck" // Make sure the label prop is passed here
            >
              <MenuItem value="Truck 1">Truck 1</MenuItem>
              <MenuItem value="Truck 2">Truck 2</MenuItem>
            </Select>
          </FormControl>
        </Grid2>

        {/* Personal Selection */}
        <Grid2 size={{ xs: 6, sm: 8 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="personal-select-label">Assign Personal</InputLabel>
            <Select
              multiple
              labelId="personal-select-label"
              id="personal-select"
              label="Assign Personal" // Make sure the label prop is passed here
              value={personals}
              onChange={handlePersonalChange}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {availablePersonals.map((personal) => (
                <MenuItem key={personal} value={personal}>
                  {personal}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        {/* Waste Type Checkboxes */}
        <Grid2 item xs={16} sm={4}>
          <FormControlLabel control={<Checkbox />} label="Organic" />
        </Grid2>
        <Grid2 item xs={16} sm={4}>
          <FormControlLabel control={<Checkbox />} label="Recycle" />
        </Grid2>
        <Grid2 item xs={16} sm={4}>
          <FormControlLabel control={<Checkbox />} label="Non Recycle" />
        </Grid2>
        <Grid2 item xs={16} sm={4}>
          <FormControlLabel control={<Checkbox />} label="Special" />
        </Grid2>

        {/* Submit Button */}
        <Grid2 item xs={16}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Add Route
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default AddSchedule;
