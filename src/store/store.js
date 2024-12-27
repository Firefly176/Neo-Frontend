import { configureStore } from "@reduxjs/toolkit";
import metamaskSlice from "./reducer";

export default configureStore({
  reducer: {
    metamask: metamaskSlice,
  },
});
