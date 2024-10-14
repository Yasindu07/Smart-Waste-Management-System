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
  CircularProgress,
  Box,
  TablePagination,
} from "@mui/material";
import AddCollector from "../../../components/admin/AddCollectors";
import { API_URL } from "../../../config/config";
import axios from "axios";

const Collectors = () => {
  const [open, setOpen] = useState(false); // State to manage modal visibility
  const [collectors, setCollectors] = useState([]); // List of collectors
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(0); // Pagination - current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Pagination - rows per page

  useEffect(() => {
    const fetchCollectors = async () => {
      setLoading(true); // Start loading
      try {
        const res = await axios.get(`${API_URL}/user/getcollectors`, {
          withCredentials: true,
        });
        const data = res.data;
        setCollectors(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchCollectors();
  }, []);

  // Open the modal
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginate the collectors data
  const paginatedCollectors = collectors.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: 30, textAlign: "center" }}>Waste Collectors</h1>

      {/* Add Collector Button */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Collector
      </Button>

      {/* Collector Table */}
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={5}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCollectors.length > 0 ? (
                  paginatedCollectors.map((collector, index) => (
                    <TableRow key={index}>
                      <TableCell>{collector.username}</TableCell>
                      <TableCell>{collector.email}</TableCell>
                      <TableCell>{collector.nic}</TableCell>
                      <TableCell>{collector.phone}</TableCell>
                      <TableCell>{collector.address}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No Collectors Added
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {/* Pagination */}
            <TablePagination
              component="div"
              count={collectors.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </>
        )}
      </TableContainer>

      {/* Modal for adding collectors */}
      <AddCollector open={open} handleClose={handleClose} />
    </div>
  );
};

export default Collectors;
