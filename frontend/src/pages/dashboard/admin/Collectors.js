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
import AddCollector from "../../../components/admin/AddCollectors";

const Collectors = () => {
  const [open, setOpen] = useState(false); // State to manage modal visibility
  const [collectors, setCollectors] = useState([]); // List of collectors

  // Open the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCollector = (collector) => {
    setCollectors([...collectors, collector]);
    handleClose(); // Close the modal after adding collector
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>Collector Management</h1>

      {/* Add Collector Button */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Collector
      </Button>

      {/* Collector Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>NIC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {collectors.length > 0 ? (
              collectors.map((collector, index) => (
                <TableRow key={index}>
                  <TableCell>{collector.username}</TableCell>
                  <TableCell>{collector.email}</TableCell>
                  <TableCell>{collector.nic}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No Collectors Added
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for adding collectors */}
      <AddCollector
        open={open}
        handleClose={handleClose}
        handleAddCollector={handleAddCollector}
      />
    </div>
  );
};

export default Collectors;
