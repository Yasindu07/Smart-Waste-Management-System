import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Button,
  TextField,
  Grid2,
  Box,
  Typography,
  Container,
  Snackbar,
  Alert,
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
  IconButton,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import logo from "../../assets/images/no bg@4x.png";

import { API_URL } from "../../config/config";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMessage) setErrorMessage(""); // Clear error when typing
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // setOpenSnackbar(true);
        throw new Error(data.message || "Failed to sign up");
      }

      setLoading(false);
      setOpenSnackbar(true);
      setTimeout(() => {
        navigate("/auth/sign-in");
      }, 400);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message || "An error occurred");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            // height: 200,
            width: 130,
            maxHeight: { xs: 200, md: 300 },
            maxWidth: { xs: 300, md: 400 },
          }}
          alt="Image description"
          src={logo}
        />
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            autoComplete="given-name"
            name="username"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />

          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">
              Password *
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          <Grid2 container justifyContent="center">
            <Grid2 item>
              <Link to="/auth/sign-in" variant="body2">
              <Typography color="secondary.dark">
              Already have an account? Sign in</Typography>
              </Link>
            </Grid2>
          </Grid2>
          {errorMessage && <p>{errorMessage}</p>}
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={errorMessage ? "error" : "success"} // Show success or error
            sx={{ width: "100%" }}
          >
            {errorMessage ? errorMessage : "Signup successful! Redirecting..."}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Signup;
