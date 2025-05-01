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
        const res = await checkAuth();
        if (res && res.user) {
          dispatch(addUser(res.user));
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
