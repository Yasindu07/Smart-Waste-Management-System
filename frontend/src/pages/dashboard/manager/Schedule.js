// src/components/Schedule.js

import React, { useEffect, useState ,navigate} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Chip,
  Tooltip,
  Button
} from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

// Styled TableCell for header
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

// Styled TableRow for striped effect
const StyledTableRow = styled(TableRow)(({ theme, index }) => ({
  backgroundColor: index % 2 === 0 ? theme.palette.action.hover : 'inherit',
}));

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch schedules from the backend
  const fetchSchedules = async () => {
    try {
      const res = await axios.get('http://localhost:5002/api/schedules');
      setSchedules(res.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch schedules.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString([], options);
  };

  return (
    <Box>
     <Button
      component={Link} // Use Link as the component
      to="/dashboard/add-shedule" // The path to navigate to
      variant="contained"
      color="success" // Green color
      sx={{ margin: '1rem' }} // Optional: Adds some space around the button
    >
      Add Schedule
    </Button>
      <Container maxWidth="lg" sx={{ marginTop: { xs: '2rem', md: '4rem' }, marginBottom: '2rem' }}>
       

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ marginTop: '2rem' }}>
            {error}
          </Alert>
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <StyledTableCell>Time</StyledTableCell> */}
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Code</StyledTableCell>
                  <StyledTableCell>Truck Number</StyledTableCell>
                  <StyledTableCell>Garbage Collector Name</StyledTableCell>
                  <StyledTableCell>Weight (kg)</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Special</StyledTableCell>
                  <StyledTableCell>Created At</StyledTableCell>
                  <StyledTableCell>Updated At</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schedules.map((schedule, index) => {
                  const currentDate = new Date();
                  const scheduleDate = new Date(schedule.time);
                  const datePassed = scheduleDate < currentDate;

                  return (
                    <StyledTableRow key={schedule._id} index={index}>
                      {/* <TableCell>{formatDate(schedule.time)}</TableCell> */}
                      <TableCell>{schedule.address}</TableCell>
                      <TableCell>
                        {schedule.status === 'done' ? (
                          <Chip
                            label="Done"
                            color="success"
                            icon={<CheckCircleIcon />}
                            variant="outlined"
                          />
                        ) : (
                          <Chip
                            label="Not Done"
                            color="warning"
                            icon={<HourglassEmptyIcon />}
                            variant="outlined"
                          />
                        )}
                        {datePassed && schedule.status === 'notdone' && (
                          <Tooltip title="This schedule is overdue!">
                            <DeleteSweepIcon color="error" sx={{ marginLeft: '0.5rem' }} />
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell>{schedule.code}</TableCell>
                      <TableCell>{schedule.truckNumber}</TableCell>
                      <TableCell>{schedule.garbageCollectorId || 'N/A'}</TableCell>
                      <TableCell>{schedule.weight !== null ? schedule.weight : 'N/A'}</TableCell>
                      <TableCell>{schedule.type || 'N/A'}</TableCell>
                      <TableCell>
                        {schedule.special ? (
                          <Chip
                            label="Special"
                            color="primary"
                            icon={<StarIcon />}
                            variant="outlined"
                          />
                        ) : (
                          'No'
                        )}
                      </TableCell>
                      <TableCell>{formatDate(schedule.createdAt)}</TableCell>
                      <TableCell>{formatDate(schedule.updatedAt)}</TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  );
};

export default Schedule;