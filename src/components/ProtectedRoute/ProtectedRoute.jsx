// ProtectedRoute.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { disconnect, setUserDetails } from "../../store/reducer";
import { get } from "../../utils/api_helper";
// import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.auth?.userDetails);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await get("/auth/profile");
        dispatch(setUserDetails(response));
        navigate("/home");
      } catch (error) {
        console.error("Error fetching profile", error);
        dispatch(disconnect());
        navigate("/landing");
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />
      {userDetails ? element : <Loader />}
      <Footer />
    </>
  );
};

export default ProtectedRoute;
