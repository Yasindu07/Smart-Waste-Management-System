// src/components/DashboardIndex.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  MenuItem,
  Select,
  Paper,
  Box,
  Grid,
  CircularProgress,
  Alert,
  Tooltip,
  Button,
} from '@mui/material';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { DataGrid } from '@mui/x-data-grid';
import {
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Star as StarIcon,
  CalendarToday as CalendarTodayIcon,
  DeleteSweep as DeleteSweepIcon,
  LocalShipping as LocalShippingIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// Styled TableCell for header
const StyledTableCell = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  '& .MuiDataGrid-row:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const DashboardIndex = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [filteredData, setFilteredData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [tableRows, setTableRows] = useState([]);




  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Title
    doc.setFontSize(14);
    doc.text('Collected Waste Details', 10, 15);
  
    // Add a line space
    doc.setFontSize(10);
    doc.text('Date: ' + new Date().toLocaleDateString(), 10, 25); // Current date
  
    // Adding the table
    doc.autoTable({
      head: [
        ['QR Code', 'Truck Number', 'Collector', 'Date', 'Address', 'Organic (Kg)', 'Recycle (Kg)', 'Non-Recycle (Kg)'],
      ],
      body: tableRows.map(row => [
        row.customerID,
        row.deviceID,
        row.name,
        row.fullDate,
        row.address,
        row.organic.replace(' Kg', ''), // Removing 'Kg' for clarity in the table
        row.recycle.replace(' Kg', ''),
        row.nonRecycle.replace(' Kg', ''),
      ]),
      startY: 40, // Adjusted start position for table
      styles: {
        cellPadding: 3, // Smaller padding for a tighter layout
        fontSize: 8, // Smaller font size
      },
      headStyles: {
        fillColor: [22, 160, 133],
        textColor: [255, 255, 255],
        fontSize: 10, // Slightly larger font for the header
      },
      theme: 'grid',
    });
  
    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Page ${i} of ${pageCount}`, 10, doc.internal.pageSize.height - 10); // Footer with page number
    }
  
    // Save the PDF
    doc.save('collected_waste_details.pdf');
  };
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

  // Process data whenever schedules or filters change
  useEffect(() => {
    // Filter data based on selected district and year
    const filtered = schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.time);
      const scheduleYear = scheduleDate.getFullYear();
      const scheduleDistrict = schedule.address.split(',').pop().trim(); // Assuming district is the last part of the address

      const districtMatch =
        selectedDistrict === 'All' || scheduleDistrict === selectedDistrict;
      const yearMatch = scheduleYear === Number(selectedYear);

      return districtMatch && yearMatch;
    });

    setFilteredData(filtered);

    // Aggregate data for BarChart
    const monthWiseData = {};

    filtered.forEach((schedule) => {
      const month = new Date(schedule.time).toLocaleString('default', { month: 'short' });
      if (!monthWiseData[month]) {
        monthWiseData[month] = { month, Organic: 0, Recycle: 0, NonRecycle: 0 };
      }

      const { type, weight } = schedule;

      if (type === 'Organic') {
        monthWiseData[month].Organic += weight || 0;
      } else if (type === 'Recycle') {
        monthWiseData[month].Recycle += weight || 0;
      } else if (type === 'NonRecycle') {
        monthWiseData[month].NonRecycle += weight || 0;
      }
    });

    const barChartData = Object.values(monthWiseData).sort((a, b) => {
      const monthOrder = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ];
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });

    setBarData(barChartData);

    // Aggregate data for PieChart
    const pieDataAggregate = { Organic: 0, Recycle: 0, NonRecycle: 0 };

    filtered.forEach((schedule) => {
      const { type, weight } = schedule;
      if (type === 'Organic') {
        pieDataAggregate.Organic += weight || 0;
      } else if (type === 'Recycle') {
        pieDataAggregate.Recycle += weight || 0;
      } else if (type === 'NonRecycle') {
        pieDataAggregate.NonRecycle += weight || 0;
      }
    });

    const pieChartData = [
      { name: 'Organic', value: pieDataAggregate.Organic ,fill: 'blue'},
      { name: 'Recycle', value: pieDataAggregate.Recycle ,fill: 'green' },
      { name: 'NonRecycle', value: pieDataAggregate.NonRecycle , fill: 'red'},
    ];

    setPieData(pieChartData);

    // Prepare table rows
    const tableData = filtered.map((schedule) => ({
      id: schedule._id,
      customerID: schedule.code,
      deviceID: schedule.truckNumber,
      name: schedule.garbageCollectorId || 'N/A',
      fullDate: new Date(schedule.time).toLocaleString(),
      address: schedule.address,
      phone: 'N/A', // Assuming phone is not available; adjust if necessary
      organic: schedule.type === 'Organic' ? `${schedule.weight} Kg` : '-',
      recycle: schedule.type === 'Recycle' ? `${schedule.weight} Kg` : '-',
      nonRecycle: schedule.type === 'NonRecycle' ? `${schedule.weight} Kg` : '-',
    }));

    setTableRows(tableData);
  }, [schedules, selectedDistrict, selectedYear]);

  // Handle Delete Schedule
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      try {
        await axios.delete(`http://localhost:5002/api/schedules/${id}`);
        setSchedules(schedules.filter((schedule) => schedule._id !== id));
      } catch (err) {
        alert('Failed to delete schedule.');
      }
    }
  };

  // Handle Edit Schedule
  // Assuming you have an EditSchedule component
  // No additional code needed here as we use Link for navigation

  // Get unique districts from schedules
  const getUniqueDistricts = () => {
    const districts = schedules.map((schedule) => {
      const parts = schedule.address.split(',');
      return parts.length > 1 ? parts[parts.length - 1].trim() : 'Unknown';
    });
    return ['All', ...new Set(districts)];
  };

  // Define columns for DataGrid
  const columns = [
    { field: 'customerID', headerName: 'QR Code', width: 150 },
    { field: 'deviceID', headerName: 'Truck Number', width: 150 },
    { field: 'name', headerName: 'Garbage Collector', width: 200 },
    { field: 'fullDate', headerName: 'Full Date', width: 200 },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'organic', headerName: 'Collected Quantity (Organic)', width: 200 },
    { field: 'recycle', headerName: 'Collected Quantity (Recycle)', width: 200 },
    { field: 'nonRecycle', headerName: 'Collected Quantity (Non Recycle)', width: 200 },
  ];

  return (
    <Box sx={{ padding: 3 }}>
     
     <Button variant="contained" color="primary" onClick={generatePDF} sx={{ mb: 2 }}>
      Download PDF Report
    </Button>
      {/* Report Section */}
      <Grid container spacing={3} sx={{ marginBottom: 5 }}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom>
            Monthly Report per Year
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
            <Select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              displayEmpty
              sx={{ minWidth: 200 }}
            >
              {getUniqueDistricts().map((district) => (
                <MenuItem key={district} value={district}>
                  {district}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              displayEmpty
              sx={{ minWidth: 150 }}
            >
              {[...new Set(schedules.map((schedule) => new Date(schedule.time).getFullYear()))].map(
                (year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                )
              )}
            </Select>
          </Box>

          {/* Bar Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="Organic" fill="Green" />
              <Bar dataKey="Recycle" fill="blue" />
              <Bar dataKey="NonRecycle" fill="red" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <Typography sx={{ml:15}} variant="h6" gutterBottom>
                Total Collected Waste Details 
          </Typography>
          {/* Pie Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="green"
                label
              />
              <RechartsTooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>

      {/* Table Section */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Collected Waste Details
          </Typography>
          <Paper sx={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={tableRows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 20, 50]}
              disableSelectionOnClick
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Error Message */}
      {error && (
        <Box sx={{ marginTop: 5 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Loading Spinner */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default DashboardIndex;