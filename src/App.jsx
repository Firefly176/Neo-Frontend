// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Footer from "./components/Footer/Footer";
import NavbarComponent from "./components/Navbar/Navbar";

function App() {
  const router = createBrowserRouter([
    {
      path: "/home",
      element: (
        <>
          <NavbarComponent />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: "/home",
      element: (
        <>
          <NavbarComponent />
          <Home />
          <Footer />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
