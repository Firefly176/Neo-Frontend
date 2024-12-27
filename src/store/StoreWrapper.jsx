import { Provider } from "react-redux";
// import { ToastContainer } from "react-toastify";
import store from "./store";
// import "react-toastify/dist/ReactToastify.css";
// eslint-disable-next-line react/prop-types
const StoreWrapper = ({ children }) => (
  <Provider store={store}>
    {/* <ToastContainer /> */}
    {children}
  </Provider>
);

export default StoreWrapper;
