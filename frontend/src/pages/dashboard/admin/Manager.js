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
import { API_URL } from "../../../config/config";
import axios from "axios";
import AddManagers from "../../../components/admin/AddManagers";

const Manager = () => {
  const [open, setOpen] = useState(false);
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchCollectors = async () => {
      setLoading(true); // Start loading
      try {
        const res = await axios.get(`${API_URL}/user/getusers?role=manager`, {
          withCredentials: true,
        });
        const data = res.data;
        setManagers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectors();
  }, [open]);
  const handleClickOpen = () => {
    setOpen(true);
  };

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

  const paginatedCollectors = managers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: 30, textAlign: "center" }}>
        Managers
      </h1>

      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Managers
      </Button>

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
              count={managers.length}
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
      <AddManagers open={open} handleClose={handleClose} />
    </div>
  );
};

export default Manager;
