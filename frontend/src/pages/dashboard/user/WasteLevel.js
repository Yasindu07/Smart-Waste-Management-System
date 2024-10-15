import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Grid,
  IconButton,
  CircularProgress as Loader,
} from "@mui/material";
import RecyclingIcon from "@mui/icons-material/Recycling";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useParams } from "react-router-dom"; // For route-based userId
import axios from "axios"; // Update the path as necessary
import { API_URL } from "../../../config/config";
import { useSelector } from "react-redux";

const WasteLevelCard = ({ title, level, icon, color }) => (
  <Paper
    elevation={3}
    sx={{ padding: 3, borderRadius: 2, textAlign: "center" }}
  >
    <IconButton sx={{ fontSize: 50, color: color }}>{icon}</IconButton>
    <Typography variant="h6" sx={{ marginY: 1 }}>
      {title}
    </Typography>
    <CircularProgress
      variant="determinate"
      value={level}
      size={100}
      thickness={5}
      sx={{ color: color }}
    />
    <Typography variant="h6" sx={{ marginY: 1 }}>
      {level}%
    </Typography>
  </Paper>
);

const WasteLevel = () => {
  const { currentUser } = useSelector((state) => state.user); 
  const [wasteData, setWasteData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling

  // Fetch waste levels by userId
  useEffect(() => {
    const fetchWasteLevels = async () => {
      try {
        const res = await axios.get(`${API_URL}/wasteDevice/get-device-by-user/${currentUser._id}`, {
          withCredentials: true, // If authentication is required
        });
        setWasteData(res.data); 
        console.log(res.data)// Assuming response has wasteLevel object
      } catch (error) {
        setError("Failed to load waste levels.");
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchWasteLevels();
  }, [currentUser._id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center" marginTop={5}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Current Waste Levels
      </Typography>

      {/* Waste Levels Overview */}
      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        {/* Organic Waste Level */}
        <Grid item xs={12} sm={4}>
          <WasteLevelCard
            title="Organic Waste"
            level={wasteData.wasteLevel.organic}
            icon={<WaterDropIcon />}
            color="#4caf50" // Green for organic
          />
        </Grid>

        {/* Recyclable Waste Level */}
        <Grid item xs={12} sm={4}>
          <WasteLevelCard
            title="Recyclable Waste"
            level={wasteData.wasteLevel.recycle}
            icon={<RecyclingIcon />}
            color="#2196f3" // Blue for recyclable
          />
        </Grid>

        {/* Non-Recyclable Waste Level */}
        <Grid item xs={12} sm={4}>
          <WasteLevelCard
            title="Non-Recyclable Waste"
            level={wasteData.wasteLevel.nonRecycle}
            icon={<DeleteOutlineIcon />}
            color="#f44336" // Red for non-recyclable
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default WasteLevel;
