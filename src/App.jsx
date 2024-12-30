// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Landing from "./pages/Landing.jsx";
import Footer from "./components/Footer/Footer.jsx";
import NavbarComponent from "./components/Navbar/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { Navigate } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/landing" replace />,
    },
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
