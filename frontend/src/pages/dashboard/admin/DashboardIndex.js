import React from 'react'
import { Typography, MenuItem, Select, Paper, Box, Grid2 } from '@mui/material';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DataGrid } from '@mui/x-data-grid';

// Sample data for charts
const barData = [
  { month: 'Jan', Organic: 40, Recycle: 30, NonRecycle: 20 },
  { month: 'Feb', Organic: 45, Recycle: 35, NonRecycle: 25 },
  { month: 'Mar', Organic: 50, Recycle: 40, NonRecycle: 30 },
  // Add more data as necessary
];

const pieData = [
  { name: 'Organic', value: 400 },
  { name: 'Recycle', value: 300 },
  { name: 'NonRecycle', value: 300 },
];

// Sample data for table
const tableRows = [
  { id: 1, customerID: '#001', deviceID: '#001', name: 'Avishka Subash', fullDate: '05/01/2024', address: 'No 16, captain city', phone: '0774455662', organic: '10 Kg', recycle: '-', nonRecycle: '-' },
  { id: 2, customerID: '#002', deviceID: '#002', name: 'Samantha Perera', fullDate: '06/01/2024', address: 'No 16, captain city', phone: '0774455668', organic: '-', recycle: '20 Kg', nonRecycle: '-' },
  { id: 3, customerID: '#003', deviceID: '#003', name: 'Dashan Nawartha', fullDate: '06/01/2024', address: 'No 16, captain city', phone: '0775424537', organic: '-', recycle: '-', nonRecycle: '20 Kg' },
  { id: 4, customerID: '#004', deviceID: '#004', name: 'Kalum Jayamal', fullDate: '06/01/2024', address: 'No 16, captain city', phone: '0774320404', organic: '-', recycle: '-', nonRecycle: '30 Kg' },
];

const columns = [
  { field: 'customerID', headerName: 'CustomerID', width: 150 },
  { field: 'deviceID', headerName: 'DeviceID', width: 150 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'fullDate', headerName: 'Full Date', width: 150 },
  { field: 'address', headerName: 'Address', width: 250 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'organic', headerName: 'Collected Quantity (Organic)', width: 200 },
  { field: 'recycle', headerName: 'Collected Quantity (Recycle)', width: 200 },
  { field: 'nonRecycle', headerName: 'Collected Quantity (Non Recycle)', width: 200 },];

const DashboardIndex = () => {
  return (
    <Box>
      {/* Report Section */}
      <Grid2 container spacing={3} sx={{ padding: 3 }}>
        <Grid2 xs={12} sm={8}>
          <Typography variant="h6" gutterBottom>
            Monthly District Report per Year
          </Typography>
          <Select defaultValue="Colombo" sx={{ marginRight: 2 }}>
            <MenuItem value="Colombo">Colombo</MenuItem>
            <MenuItem value="Gampaha">Gampaha</MenuItem>
            <MenuItem value="Kandy">Kandy</MenuItem>
          </Select>
          <Select defaultValue="2023">
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
          </Select>

          {/* Bar Chart */}
          <BarChart width={600} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Organic" fill="#8884d8" />
            <Bar dataKey="Recycle" fill="#82ca9d" />
            <Bar dataKey="NonRecycle" fill="#ffc658" />
          </BarChart>
        </Grid2>

        <Grid2 xs={12} sm={4}>
          <Typography variant="h6" gutterBottom>
            Total Collected Waste Details per year for each district
          </Typography>
          {/* Pie Chart */}
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </Grid2>
      </Grid2>

      {/* Table Section */}
      <Grid2 container spacing={3} sx={{ padding: 3 }}>
        <Grid2 xs={12}>
          <Typography variant="h6" gutterBottom>
            Collected Waste Details
          </Typography>
          {/* Added Box for horizontal scroll */}
          <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Paper sx={{ height: 400, width: '100%' }}>
              <DataGrid rows={tableRows} columns={columns} pageSize={4} />
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default DashboardIndex