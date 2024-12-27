import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import NavbarComponent from "./components/Navbar/Navbar.jsx";
import StoreWrapper from "./store/StoreWrapper.jsx";
import store from "./store/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <StoreWrapper store={store}>
        <NavbarComponent />
        <App />
      </StoreWrapper>
    </NextUIProvider>
  </StrictMode>,
);
