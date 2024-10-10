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
} from "@mui/material";

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
      <h2>Add New Schedule</h2>
      <TextField
        fullWidth
        label="Select Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Select Time"
        type="time"
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Assign a Truck</InputLabel>
        <Select>
          <MenuItem value="Truck 1">Truck 1</MenuItem>
          <MenuItem value="Truck 2">Truck 2</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Assign Personal</InputLabel>
        <Select
          multiple
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

      <FormControlLabel control={<Checkbox />} label="Organic" />
      <FormControlLabel control={<Checkbox />} label="Recycle" />
      <FormControlLabel control={<Checkbox />} label="Non Recycle" />
      <FormControlLabel control={<Checkbox />} label="Special" />

      <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
        Add Route
      </Button>
    </form>
  );
};

export default AddSchedule;
