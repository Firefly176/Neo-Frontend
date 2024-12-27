import { createSlice } from "@reduxjs/toolkit";

export const metamaskSlice = createSlice({
  name: "metamask",
  initialState: {
    accountAddress: null,
  },
  reducers: {
    setAccountAddress: (state, action) => {
      state.accountAddress = action.payload;
    },
    disconnect: (state) => {
      state.accountAddress = null;
    },
  },
});

export const { setAccountAddress, disconnect } = metamaskSlice.actions;

export default metamaskSlice.reducer;
