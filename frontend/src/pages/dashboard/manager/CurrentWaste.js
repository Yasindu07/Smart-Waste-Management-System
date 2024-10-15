import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../../config/config";
import LinkDevice from "../../../components/manager/LinkDevice";

const CuurentWaste = [
  {
    id: 1,
    customerID: "#0001",
    deviceID: "#0001",
    name: "Yasindu Balasooriya",
    fullDate: "05/01/2024",
    address: "No. asdasdsdsa asdsadasdasda",
    phone: "076 8554789",
    organic: "50%",
    recycle: "30%",
    nonRecycle: "20%",
  },
  // Add more schedules if needed
];

const CurrentWaste = () => {
  const [wasteDevices, setWasteDevice] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true); // Start loading
      try {
        const res = await axios.get(`${API_URL}/wasteDevice/get-all-devices`, {
          withCredentials: true,
        });
        const data = res.data;
        setWasteDevice(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDevices();
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: 30, textAlign: "center" }}>
        Current Waste Level
      </h1>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Link Device
      </Button>
      <TableContainer component={Paper}  style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Device ID</TableCell>
              <TableCell>Waste Type</TableCell>
              {/* <TableCell>Waste level</TableCell> */}
              <TableCell>UserID</TableCell>
              {/* <TableCell>Phone</TableCell> */}
              <TableCell>Capacity filled (Organic)</TableCell>
              <TableCell>Capacity filled (Recycle)</TableCell>
              <TableCell>Capacity filled (Non Recycle)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {wasteDevices.map((wasteDevices) => (
              <TableRow key={wasteDevices._id}>
                <TableCell>{wasteDevices._id}</TableCell>
                <TableCell>{wasteDevices.wasteType}</TableCell>
                {/* <TableCell>{wasteDevices.wasteLevel}</TableCell> */}
                <TableCell>{wasteDevices.userId}</TableCell>
                {/* <TableCell>{wasteDevices.phone}</TableCell> */}
                <TableCell>{wasteDevices.wasteLevel.organic}%</TableCell>
                <TableCell>{wasteDevices.wasteLevel.recycle}%</TableCell>
                <TableCell>{wasteDevices.wasteLevel.nonRecycle}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <LinkDevice open={open} handleClose={handleClose} />
    </div>
  );
};

export default CurrentWaste;
