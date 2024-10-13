import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Alert,
  Box,
  Tooltip,
} from '@mui/material';
import { padding, styled } from '@mui/system';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LocationOnIcon from '@mui/icons-material/LocationOn';
// import CustomAppBar from './CustomAppBar';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ScaleIcon from '@mui/icons-material/Scale';
import RecycleIcon from '@mui/icons-material/Scale';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';


const StyledCard = styled(Card)(({ theme, status, datePassed }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: 'auto',
  minHeight: '60px',
  backgroundColor:
    datePassed && status === 'notdone'
      ? '#f55d5d' // Red if overdue and not done
      : status === 'done'
      ? 'gray' // Green if done
      : 'green', // Red if not done
  color: '#ffffff',
  boxShadow: theme.shadows[3],
  borderRadius: '16px',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.shadows[6],
  },
  [theme.breakpoints.down('sm')]: {
    minHeight: '30px', // Reduced height for smaller screens
  },
}));

  const Schedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedCard, setExpandedCard] = useState(null); // State to manage expanded cards
  
    const fetchSchedules = async () => {
      try {
        const res = await axios.get('http://localhost:5002/api/schedules');
        const sortedSchedules = res.data.sort((a, b) => {
          if (a.status === 'notdone' && b.status === 'done') return -1;
          if (a.status === 'done' && b.status === 'notdone') return 1;
          return 0;
        });
        setSchedules(sortedSchedules);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch schedules.');
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchSchedules();
    }, []);
  
    const handleCardClick = (id) => {
      setExpandedCard(expandedCard === id ? null : id); // Toggle expanded state
    };
  
    if (loading)
      return (
        <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '30rem' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ marginTop: '1rem' }}>
            Loading schedules...
          </Typography>
        </Container>
      );
  
    if (error)
      return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      );
  
    return (
      <Box>
        {/* <CustomAppBar name="Schedules" showBackButton={false} showMenu={true} /> */}
        <Container maxWidth="md"    sx={{
    marginTop: { xs: '2rem', md: '7rem' }, // responsive marginTop
    marginBottom: '2rem' // fixed marginBottom
  }}>
          <Grid container spacing={1.5}>
            {schedules.map((schedule) => {
              const currentDate = new Date();
              const scheduleDate = new Date(schedule.time);
              const datePassed = scheduleDate < currentDate; // Check if the date has passed
              const isExpanded = expandedCard === schedule._id; // Check if this card is expanded
  
              return (
                <Grid 
                  item 
                  xs={12} // Full width on XS screens (list view)
                  md={6} // Half width on MD and larger screens (grid view)
                  key={schedule._id}
                >
                  <StyledCard 
                    status={schedule.status} 
                    datePassed={datePassed}
                    onClick={() => handleCardClick(schedule._id)} // Add click handler
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={1}>
                        {schedule.status === 'done' ? (
                          <CheckCircleIcon fontSize="large" sx={{ marginRight: '0.5rem' }} />
                        ) : (
                          <HourglassEmptyIcon fontSize="large" sx={{ marginRight: '0.5rem' }} />
                        )}
                        <Typography variant="h6" component="div">
                          {new Date(schedule.time).toLocaleString([], { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            hour12: true 
                          })}
                        </Typography>
                        {datePassed && schedule.status === 'notdone' && (
                          <Tooltip title="This schedule is overdue!">
                          
                            <WarningAmberIcon color="error" sx={{ marginLeft: '0.8rem' }} />
                          </Tooltip>
                        )}
                      </Box>
                      <Box display="flex" alignItems="center" mb={1}>
                        <LocationOnIcon color="action" sx={{ marginRight: '0.5rem' }} />
                        <Typography variant="body1" color="inherit">
                          {schedule.address}
                        </Typography>
                      </Box>
                      {isExpanded && ( // Show details only when expanded
                        <>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" color="inherit">
                              Status: {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                            </Typography>
                          </Box>
                          <Box display="flex" alignItems="center" mb={1}>
                            <Typography variant="body1" color="inherit">
                              Code: {schedule.code}
                            </Typography>
                          </Box>
                          {schedule.status === 'done' && (
                            <>
                              <Box display="flex" alignItems="center" mb={1}>
                                <ScaleIcon fontSize="small" sx={{ marginRight: '0.5rem', color: '#ffffff' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                  Weight: {schedule.weight} kg
                                </Typography>
                              </Box>
                              <Box display="flex" alignItems="center" mb={1}>
                                <DeleteSweepIcon fontSize="medium" sx={{ marginRight: '0.5rem', color: '#ffffff' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                  Type: {schedule.type}
                                </Typography>
                              </Box>
                            </>
                          )}
                        </>
                      )}
                    </CardContent>
                    {isExpanded && ( // Show button only when expanded
                      <CardActions sx={{ justifyContent: 'flex-end', paddingRight: '1rem', paddingBottom: '1rem' }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          component={Link}
                          to={`/dashboard/show-route/${schedule._id}`} // Corrected path with 'dashboard'
                          sx={{ textTransform: 'none' }}
                        >
                          View Route
                        </Button>
                      </CardActions>
                    )}
                  </StyledCard>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    );
  };
  
  export default Schedules;