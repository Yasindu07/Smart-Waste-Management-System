import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: localStorage.getItem('user') || null,
  token: localStorage.getItem('token')||null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, logoutSuccess } = userSlice.actions;

export default userSlice.reducer;
