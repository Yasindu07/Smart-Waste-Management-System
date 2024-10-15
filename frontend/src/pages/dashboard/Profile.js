import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Typography,
  Paper,
  Button,
  Grid2,
  CircularProgress,
  TextField,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../../config/config";
import {
  updateFailure,
  updateStart,
  updateSuccess,
} from "../../redux/user/userSlice";
import CustomSnackbar from "../../components/CustomSnackbar";

const Profile = () => {
  const { currentUser, error } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false); // Track API call status
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    nic: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    dispatch(updateStart());
    e.preventDefault();
    const phoneRegex = /^\d{10}$/; // Phone must be exactly 10 digits
  const nicRegex = /^[0-9]{9}[vVxX]$|^[0-9]{12}$/; // Old or new NIC formats
    setLoading(true);
    if (!formData.phone || !formData.address || !formData.nic) {
      dispatch(updateFailure("All fields are required."));
      setLoading(false);
      return;
    }

    if (!phoneRegex.test(formData.phone)) {
      dispatch(updateFailure("Phone number must be exactly 10 digits."));
      setLoading(false);
      return;
    }

    if (!nicRegex.test(formData.nic)) {
      dispatch(updateFailure("Please enter a valid NIC."));
      setLoading(false);
      return;
    }
    try {
      const res = await axios.put(
        `${API_URL}/user/completeprofile/${currentUser._id}`,
        formData,
        { withCredentials: true } // Send cookies for authentication
      );
      const data = res.data;

      if (data.success === false) {
        dispatch(updateFailure(data.message));
      } else {
        dispatch(updateSuccess(data.user));
        setOpenSnackbar(true);
      }
    } catch (error) {
      dispatch(updateFailure(error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        padding: { xs: 4, sm: 6 },
        maxWidth: 800,
        margin: "auto",
        backgroundColor: "#f9f9f9",
        borderRadius: 2,
      }}
    >
      <Grid2 container spacing={3} direction="column" alignItems="center">
        {/* User Avatar */}
        <Grid2 item>
          <Avatar
            alt={currentUser.name}
            src={currentUser.profilePicture}
            sx={{
              width: { xs: 80, sm: 100 },
              height: { xs: 80, sm: 100 },
              marginBottom: 2,
            }}
          />
        </Grid2>

        {/* User Information */}
        <Grid2 item>
          <Typography
            variant="h4"
            sx={{
              marginBottom: 1,
              fontSize: { xs: "1.5rem", sm: "2rem" },
            }}
          >
            {currentUser.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginBottom: 2,
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            {currentUser.email}
          </Typography>
        </Grid2>

        {/* Profile Completion Section */}
        {!currentUser.isCompleted && currentUser.role === "user" && (
          <Grid2 item sx={{ width: "100%", marginTop: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Complete Your Profile
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid2 container spacing={2}>
                <Grid2 xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    name="phone"
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Grid2>
                <Grid2 xs={12} sm={6}>
                  <TextField
                    label="Address"
                    name="address"
                    fullWidth
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Grid2>
                <Grid2 xs={12} sm={6}>
                  <TextField
                    label="NIC"
                    name="nic"
                    fullWidth
                    value={formData.nic}
                    onChange={handleChange}
                    required
                  />
                </Grid2>
              </Grid2>
              {error && (
                <Typography alignContent={"center"} color="error">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{ marginTop: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Save Changes"}
              </Button>
            </form>
          </Grid2>
        )}

        {/* Completed Profile Details */}
        {(currentUser.isCompleted || currentUser.role !== "user") && (
          <Grid2
            item
            container
            spacing={3}
            columns={16}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <Grid2 item size={{ xs: 16, sm: 8 }}>
              <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Phone:
              </Typography>
              <Typography sx={{ color: "text.primary" }}>
                {currentUser.phone || "Not provided"}
              </Typography>
            </Grid2>
            <Grid2 item size={{ xs: 16, sm: 8 }}>
              <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Address:
              </Typography>
              <Typography sx={{ color: "text.primary" }}>
                {currentUser.address || "Not provided"}
              </Typography>
            </Grid2>
            <Grid2 item size={{ xs: 16, sm: 8 }}>
              <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>
                NIC:
              </Typography>
              <Typography sx={{ color: "text.primary" }}>
                {currentUser.nic || "Not provided"}
              </Typography>
            </Grid2>
            <Grid2 item size={{ xs: 16, sm: 8 }}>
              <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>
                Member Since:
              </Typography>
              <Typography sx={{ color: "text.primary" }}>
                {new Date(currentUser.createdAt).toLocaleDateString() || "N/A"}
              </Typography>
            </Grid2>
          </Grid2>
        )}
      </Grid2>
      <CustomSnackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={"Profile updated successfully"}
        severity={"success"}
      />
    </Paper>
  );
};

export default Profile;
