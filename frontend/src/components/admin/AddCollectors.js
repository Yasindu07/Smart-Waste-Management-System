import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const AddCollector = ({ open, handleClose, handleAddCollector }) => {
  const [newCollector, setNewCollector] = useState({
    username: "",
    email: "",
    nic: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCollector((prevCollector) => ({
      ...prevCollector,
      [name]: value,
    }));
  };

  // Submit form and pass collector data back to parent
  const handleSubmit = () => {
    handleAddCollector(newCollector);
    setNewCollector({ username: "", email: "", nic: "" }); // Reset form
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add a New Collector</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Username"
          name="username"
          fullWidth
          variant="outlined"
          value={newCollector.username}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          required
          variant="outlined"
          value={newCollector.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="NIC"
          name="nic"
          fullWidth
          variant="outlined"
          value={newCollector.nic}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Collector
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCollector;
