import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box } from '@mui/material';
import AddSchedule from './AddSchedule';
const schedulesData = [
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
  
const Schedule = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
  
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
              {schedulesData.map((schedule) => (
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
        <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginTop: 2 }}>
          Add Schedule
        </Button>
  
        <Modal open={openModal} onClose={handleCloseModal}>
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
            <AddSchedule onClose={handleCloseModal} />
          </Box>
        </Modal>
      </div>
    );
}

export default Schedule