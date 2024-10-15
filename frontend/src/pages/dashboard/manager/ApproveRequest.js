import {
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios"; 

const ApproveRequest = () => {
  const [data, setData] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/api/specialCollection/get"
        );
        setData(response.data.data); 
        setLoading(false); 
      } catch (err) {
        setError(err.message); 
        setLoading(false); 
      }
    };

    fetchData(); 
  }, []); 

  const handleStatusChange = (id, field, value) => {
    setData((prevData) =>
      prevData.map((row) =>
        row._id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const handleUpdate = async (id, payment, wasteStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:5002/api/specialCollection/updateStatus/${id}`,
        {
          payment, 
          wasteStatus,
        }
      );
      console.log("Update successful:", response.data);
      
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>Error: {error}</div>; 
  return (
    <div style={{ margin: "20px" }}>
      <Typography variant="h5" sx={{ mb: 2 }} color="green">
        Special Collections
      </Typography>

      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table aria-label="special collections table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Waste Type</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Pick up date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Emergency Alert</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell>{row._id}</TableCell>
                <TableCell>{row.wasteType}</TableCell>
                <TableCell>
                  <img
                    src={row.wasteImage}
                    alt="waste"
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>
                  {new Date(row.chooseDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{row.wasteDescription}</TableCell>
                <TableCell>{row.emergencyCollection}</TableCell>
                <TableCell>{row.user.address}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    variant="outlined"
                    value={row.payment || ""} 
                    onChange={(e) =>
                      handleStatusChange(row._id, "payment", e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={row.wasteStatus}
                    size="small"
                    onChange={(e) =>
                      handleStatusChange(row._id, "wasteStatus", e.target.value)
                    }
                  >
                    <MenuItem value="Approved">Approved</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleUpdate(row._id, row.payment, row.wasteStatus)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ApproveRequest;
