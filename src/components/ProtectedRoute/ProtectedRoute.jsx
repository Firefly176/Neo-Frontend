// ProtectedRoute.js
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { disconnect, setUserDetails } from "../../store/reducer";
import { get } from "../../utils/api_helper";
// import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await get("/auth/profile");
        dispatch(setUserDetails(response));
        navigate("/home");
      } catch (error) {
        console.error("Error fetching profile", error);
        localStorage.clear();
        dispatch(disconnect());
        navigate("/landing");
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      {element}
      <Footer />
    </>
  );
};

export default ProtectedRoute;
