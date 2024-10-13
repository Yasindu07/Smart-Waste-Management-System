import React, { useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import AddTrucks from "../../../components/admin/AddTrucks";

const Trucks = () => {
  const [open, setOpen] = useState(false); // State to manage modal visibility
  const [trucks, setTrucks] = useState([]); // List of trucks

  // Open the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Add truck to the list
  const handleAddTruck = (truck) => {
    setTrucks([...trucks, truck]);
    handleClose(); // Close the modal after adding truck
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>Smart Waste Management System</h1>

      {/* Add Truck Button */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Truck
      </Button>

      {/* Truck Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Truck Name</TableCell>
              <TableCell>Capacity (kg)</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trucks.length > 0 ? (
              trucks.map((truck, index) => (
                <TableRow key={index}>
                  <TableCell>{truck.name}</TableCell>
                  <TableCell>{truck.capacity}</TableCell>
                  <TableCell>{truck.location}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No Trucks Added
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for adding trucks */}
      <AddTrucks
        open={open}
        handleClose={handleClose}
        handleAddTruck={handleAddTruck}
      />
    </div>
  );
};

export default Trucks;
