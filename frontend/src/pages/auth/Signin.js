import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid2,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";

import { API_URL } from "../../config/config";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    currentUser,
    error: errorMessage,
    loading,
  } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }
    try {
      dispatch(signInStart());

      const res = await axios.post(`${API_URL}/auth/signin`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      const data = res.data;

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (res.status === 200) {
        dispatch(signInSuccess(data));
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      dispatch(signInFailure(error.response?.data?.message || error.message));
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
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <Grid2
            container
            sx={{
              gap: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid2>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid2>
            <Grid2>
              <Link to="/auth/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid2>
            {errorMessage && <p>{errorMessage}</p>}
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
