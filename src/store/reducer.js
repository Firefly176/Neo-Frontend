import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userToken: localStorage.getItem("auth_token") || null,
    userDetails: null,
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
    disconnect: (state) => {
      state.userToken = null;
      state.userDetails = null;
    },
  },
});

export const { setUserDetails, setUserToken, disconnect } = authSlice.actions;

export default authSlice.reducer;
