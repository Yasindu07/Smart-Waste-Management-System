import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Select,
    MenuItem,
    IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminRequestsPage = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/device/getDevices'); // Update with your actual API endpoint
                setRequests(response.data.requests);
            } catch (err) {
                setError('Failed to fetch requests.');
                console.error("Error fetching requests:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    // Function to update the request status
    const handleChangeStatus = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:5002/api/device/updateRequest/${id}`, { status: newStatus });
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id ? { ...request, status: newStatus } : request
                )
            );
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };

    // Function to delete a request
    const handleDeleteRequest = async (id) => {
        if (window.confirm("Are you sure you want to delete this request?")) {
            try {
                await axios.delete(`http://localhost:5002/api/device/deleteRequest/${id}`);
                setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
            } catch (err) {
                console.error("Error deleting request:", err);
            }
        }
    };

    return (
        <TableContainer component={Paper} sx={{ margin: 2 }}>
            <Typography variant="h4" sx={{ textAlign: 'center', margin: 2 }}>
                All Waste Tracking Device  Requests
            </Typography>
            {loading ? (
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    Loading...
                </Typography>
            ) : error ? (
                <Typography variant="h6" sx={{ textAlign: 'center', color: 'red' }}>
                    {error}
                </Typography>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User Email</TableCell>
                            <TableCell>Waste Type</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests.map((request) => (
                            <TableRow key={request._id}>
                                <TableCell>{request.user.email && request.user.email}</TableCell>
                                <TableCell>{request.wasteType}</TableCell>
                                <TableCell>{request.address}</TableCell>
                                <TableCell>
                                    <Select
                                        value={request.status}
                                        onChange={(e) => handleChangeStatus(request._id, e.target.value)}
                                        sx={{ minWidth: 120 }}
                                    >
                                        <MenuItem value="Pending">Pending</MenuItem>
                                        <MenuItem value="Approved">Approved</MenuItem>
                                        <MenuItem value="Rejected">Rejected</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteRequest(request._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
};

export default AdminRequestsPage;
