import React from "react";
import { Navigate } from "react-router-dom";
import useAuthorization from "../hooks/useAuthorization";

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthorized, isAuthenticated } = useAuthorization(roles);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
