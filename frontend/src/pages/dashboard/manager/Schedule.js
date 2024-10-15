// src/components/Schedule.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  TablePagination,
} from '@mui/material';
import { styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import StarIcon from '@mui/icons-material/Star';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MuiAlert from '@mui/material/Alert';

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

// Alert component for Snackbar
const AlertComponent = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  const navigate = useNavigate();

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

  // Handle Delete Button Click
  const handleDeleteClick = (schedule) => {
    setScheduleToDelete(schedule);
    setDeleteDialogOpen(true);
  };

  // Confirm Deletion
  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5002/api/schedules/${scheduleToDelete._id}`);
      setSchedules(schedules.filter((s) => s._id !== scheduleToDelete._id));
      setSnackbar({ open: true, message: 'Schedule deleted successfully!', severity: 'success' });
      setDeleteDialogOpen(false);
      setScheduleToDelete(null);
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to delete schedule.', severity: 'error' });
      setDeleteDialogOpen(false);
      setScheduleToDelete(null);
    }
  };

  // Cancel Deletion
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setScheduleToDelete(null);
  };

  // Handle Snackbar Close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Handle Change of Page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Change of Rows Per Page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  return (
    <Box>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <AlertComponent onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </AlertComponent>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Schedule</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this schedule? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Schedule Button */}
      <Button
        component={Link} // Use Link as the component
        to="/dashboard/addShedule" // The path to navigate to
        variant="contained"
        color="success" // Green color
        startIcon={<StarIcon />} // Optional: Adds an icon
        sx={{ margin: '1rem' }} // Adds some space around the button
      >
        Add Schedule
      </Button>

      {/* Main Container */}
      <Container maxWidth="100%" sx={{ marginTop: { xs: '0.1rem', md: '0.1rem' }, marginBottom: '2rem' }}>
        {/* Display Loading, Error, or Table */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ marginTop: '2rem' }}>
            {error}
          </Alert>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ marginTop: '2rem' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Address</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Code</StyledTableCell>
                    <StyledTableCell>Truck Number</StyledTableCell>
                    <StyledTableCell>Garbage Collector</StyledTableCell>
                    <StyledTableCell>Weight (kg)</StyledTableCell>
                    <StyledTableCell>Type</StyledTableCell>
                    <StyledTableCell>Special</StyledTableCell>
                    <StyledTableCell>Date and Time</StyledTableCell>
                    <StyledTableCell>Updated At</StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell> {/* New Actions Column */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedules
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((schedule, index) => {
                      const currentDate = new Date();
                      const scheduleDate = new Date(schedule.time);
                      const datePassed = scheduleDate < currentDate;

                      return (
                        <StyledTableRow key={schedule._id} index={index}>
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
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <LocalShippingIcon sx={{ marginRight: '0.5rem' }} />
                              {schedule.truckNumber}
                            </Box>
                          </TableCell>
                          <TableCell>{schedule.garbageCollectorId || 'N/A'}</TableCell>
                          <TableCell>{schedule.weight || 0}</TableCell>
                          <TableCell>{schedule.type || 'N/A'}</TableCell>
                          <TableCell>
                            {schedule.special ? (
                              <Chip label="Yes" color="primary" icon={<StarIcon />} />
                            ) : (
                              <Chip label="No" color="default" />
                            )}
                          </TableCell>
                          <TableCell>{formatDate(schedule.time)}</TableCell>
                          <TableCell>{formatDate(schedule.updatedAt)}</TableCell>
                          <TableCell align="center">
                            <IconButton
                              component={Link}
                              to={`/dashboard/edit-schedule/${schedule._id}`}
                              color="primary"
                              aria-label="edit"
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => handleDeleteClick(schedule)}
                              color="error"
                              aria-label="delete"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Pagination Component */}
            <TablePagination
              rowsPerPageOptions={[10, 15, 20]}
              component="div"
              count={schedules.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Container>
    </Box>
  );
};

export default Schedule;