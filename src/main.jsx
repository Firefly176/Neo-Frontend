import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import StoreWrapper from "./store/StoreWrapper.jsx";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <StoreWrapper store={store}>
        <App />
      </StoreWrapper>
    </NextUIProvider>
  </StrictMode>,
);
