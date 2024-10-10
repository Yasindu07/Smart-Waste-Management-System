import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CuurentWaste = [
    {
      id: 1,
      customerID: '#0001',
      deviceID: '#0001',
      name: 'Yasindu Balasooriya',
      fullDate: '05/01/2024',
      address: 'No. asdasdsdsa asdsadasdasda',
      phone: '076 8554789',
      organic: '50%',
      recycle: '30%',
      nonRecycle: '20%',
    },
    // Add more schedules if needed
  ];

const CurrentWaste = () => {
  return (
    <div>
        <h2>Current Waste Level</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>Device ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Full Date</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Capacity filled (Organic)</TableCell>
                <TableCell>Capacity filled (Recycle)</TableCell>
                <TableCell>Capacity filled (Non Recycle)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {CuurentWaste.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.customerID}</TableCell>
                  <TableCell>{schedule.deviceID}</TableCell>
                  <TableCell>{schedule.name}</TableCell>
                  <TableCell>{schedule.fullDate}</TableCell>
                  <TableCell>{schedule.address}</TableCell>
                  <TableCell>{schedule.phone}</TableCell>
                  <TableCell>{schedule.organic}</TableCell>
                  <TableCell>{schedule.recycle}</TableCell>
                  <TableCell>{schedule.nonRecycle}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}

export default CurrentWaste