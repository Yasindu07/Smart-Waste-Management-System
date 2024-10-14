import { Button, InputAdornment, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React from 'react'


const data = [
    {
      id: "#0001",
      wasteType: "Organic",
      image: "https://via.placeholder.com/40", // Placeholder image
      pickupDate: "2024/10/24",
      description: "No. asdsadasdsa asdsadasdsa",
      emergencyAlert: "Yes",
      price: "",
      status: "Approved",
    },
  ];
const ApproveRequest = () => {
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
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.wasteType}</TableCell>
                <TableCell>
                  <img
                    src={row.image}
                    alt="waste"
                    style={{ width: 40, height: 40, borderRadius: "50%" }}
                  />
                </TableCell>
                <TableCell>{row.pickupDate}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.emergencyAlert}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={row.status}
                    size="small"
                    onChange={(e) => console.log(e.target.value)}
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
                    onClick={() => console.log("Update clicked")}
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
  )
}

export default ApproveRequest