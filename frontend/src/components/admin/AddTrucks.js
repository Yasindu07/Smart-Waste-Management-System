import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const AddTrucks = ({ open, handleClose, handleAddTruck }) => {
  const [newTruck, setNewTruck] = useState({
    name: "",
    capacity: "",
    location: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTruck((prevTruck) => ({
      ...prevTruck,
      [name]: value,
    }));
  };

  // Submit form and pass truck data back to parent
  const handleSubmit = () => {
    handleAddTruck(newTruck);
    setNewTruck({ name: "", capacity: "", location: "" }); // Reset form
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a New Truck</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Truck Name"
          name="name"
          fullWidth
          variant="outlined"
          value={newTruck.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Capacity (kg)"
          name="capacity"
          fullWidth
          variant="outlined"
          value={newTruck.capacity}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Location"
          name="location"
          fullWidth
          variant="outlined"
          value={newTruck.location}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Truck
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTrucks;
