// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Footer from "./components/Footer/Footer";
import NavbarComponent from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const router = createBrowserRouter([
    {
      path: "/landing",
      element: (
        <>
          <NavbarComponent />
          <Landing />
          <Footer />
        </>
      ),
    },
    {
      path: "/home",
      element: <ProtectedRoute element={<Home />} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
