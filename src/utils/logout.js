import axios from "axios";
import { removeUser } from "../store/userSlice";

export const handleLogout = async (dispatch, navigate) => {
  try {
    // Hit the logout API
    await axios.post("http://localhost:7777/api/v1/auth/logout", {}, { withCredentials: true });

    // Clear the user from Redux store
    dispatch(removeUser());

    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
