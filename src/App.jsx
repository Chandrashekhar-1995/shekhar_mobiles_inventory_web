import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../service/authApi";
import { addUser, removeUser } from "./store/userSlice";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const data = await checkAuth();
        if (data.success && data.data.user) {
          dispatch(addUser(data.data.user));
        } else {
          dispatch(removeUser());
        }
      } catch (err) {
        dispatch(removeUser());
      }
    };

    verifyUser();
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
