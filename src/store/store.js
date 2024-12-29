import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer";

export default configureStore({
  reducer: {
    auth: authSlice,
  },
});
