import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountAddress: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccountAddress: (state, action) => {
      state.accountAddress = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    disconnect: (state) => {
      state.accountAddress = null;
      state.token = null;
    },
  },
});

export const { setAccountAddress, setToken, disconnect } = authSlice.actions;

export default authSlice.reducer;
