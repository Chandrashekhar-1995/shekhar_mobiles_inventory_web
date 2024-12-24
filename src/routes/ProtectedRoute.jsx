import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet/> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;