import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Avatar,
  Link as MuiLink,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid2,
  Box,
  Typography,
  Container,
  IconButton,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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
  const { token, error, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

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
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user",JSON.stringify(data.user));

      if (data.user.role === "admin") {
        dispatch(signInSuccess(data));
        navigate("/dashboard");
      } else if (data.user.role === "user") {
        dispatch(signInSuccess(data));
        navigate("/dashboard/waste-level");
      } else if (data.user.role === "manager") {
        dispatch(signInSuccess(data));
        navigate("/dashboard/schedule");
      } else if (data.user.role === "collector") {
        dispatch(signInSuccess(data));
        navigate("/dashboard/assigned-schedule");
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
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Grid2 container justifyContent="center" sx={{ mt: 1 }}>
          {error && (
            <Typography alignContent={"center"} color="error">
              {error}
            </Typography>
          )}
        </Grid2>
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
          {/* <TextField
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
          /> */}
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel htmlFor="outlined-adornment-password">
              Password *
            </InputLabel>
            <OutlinedInput
              required
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
            justifyContent={"space-between"}
            sx={{
              gap: 2,
              display: "flex",
            }}
          >
            <Grid2>
              <Link to="#" variant="body2">
                <Typography color="secondary.dark">Forgot password?</Typography>
              </Link>
            </Grid2>
            <Grid2>
              <MuiLink href="/auth/sign-up" variant="body2" color="secondary.dark">
                <Typography color="secondary.dark">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </MuiLink>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
};

export default Signin;
