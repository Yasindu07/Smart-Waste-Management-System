import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material"
import AddTrucks from "../../../components/admin/AddTrucks";
import { API_URL } from "../../../config/config";
import axios from "axios";
import UpdateTruck from "../../../components/admin/UpdateTrucks";
import DeleteTruckConfirmation from "../../../components/admin/DeleteTruckConfirmation";

const Trucks = () => {
  const [open, setOpen] = useState(false); 
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const [selectedTruck, setSelectedTruck] = useState(null);

  useEffect(() => {
    const fetchTrucks = async () => {
      try {
        const res = await axios.get(`${API_URL}/truck/alltrucks`,{
          withCredentials: true,
        });
        const data = res.data;
        setTrucks(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTrucks();
  }, [open, openUpdate, openDelete]);

 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenUpdate = (truck) => {
    setSelectedTruck(truck);
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
    setSelectedTruck(null);
  };

  const handleOpenDelete = (truck) => {
    setSelectedTruck(truck);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedTruck(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{marginBottom:30, textAlign: "center" }}>Manage Trucks</h1>

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
              <TableCell>Number Plate</TableCell>
              <TableCell>Capacity (kg)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trucks.length > 0 ? (
              trucks.map((truck, index) => (
                <TableRow key={index}>
                  <TableCell>{truck.brand}</TableCell>
                  <TableCell>{truck.numberPlate}</TableCell>
                  <TableCell>{truck.capacity}</TableCell> 
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenUpdate(truck)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleOpenDelete(truck)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>                
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
      />

      {/* Update Truck Modal */}
      {selectedTruck && (
        <UpdateTruck
          open={openUpdate}
          handleClose={handleCloseUpdate}
          truck={selectedTruck}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {selectedTruck && (
        <DeleteTruckConfirmation
          open={openDelete}
          handleClose={handleCloseDelete}
          truck={selectedTruck}
        />
      )}
    </div>
  );
};

export default Trucks;
