import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../service/authApi";
import { addUser, removeUser } from "./store/userSlice";
import { persistor } from "./store/appStore";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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
          await persistor.purge();
        }
      } catch (err) {
        dispatch(removeUser());
        await persistor.purge();
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
