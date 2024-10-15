import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../../config/config';

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
  const [wasteDevices, setWasteDevice] = useState([]);
  const [loading, setLoading] = useState(false);
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
  }, []);

  return (
    <div style={{ padding: "20px" }}>
        <h2>Current Waste Level</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Device ID</TableCell>
                <TableCell>wasteType</TableCell>
                <TableCell>Full Date</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Capacity filled (Organic)</TableCell>
                <TableCell>Capacity filled (Recycle)</TableCell>
                <TableCell>Capacity filled (Non Recycle)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wasteDevices.map((wasteDevices) => (
                <TableRow key={wasteDevices.id}>
                  <TableCell>{wasteDevices._id}</TableCell>
                  <TableCell>{wasteDevices.wasteType}</TableCell>
                  <TableCell>{wasteDevices.wasteLevel}</TableCell>
                  <TableCell>{wasteDevices.address}</TableCell>
                  <TableCell>{wasteDevices.phone}</TableCell>
                  <TableCell>{wasteDevices.organic}</TableCell>
                  <TableCell>{wasteDevices.recycle}</TableCell>
                  <TableCell>{wasteDevices.nonRecycle}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  )
}

export default CurrentWaste