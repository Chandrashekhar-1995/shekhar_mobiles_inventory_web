import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import CustomerDashboard from "../components/customer/CustomerDashboard";
import AdminDashboard from "../components/user/AdminDashboard";
import CreateCustomer from "../components/customer/CreateCustomer";
import UserDashboard from "../components/user/UserDashboard";
import useAuth from "../hooks/useAuth";

// Helper component for protected routes
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user?.designation)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Routes definition
const PrivateRoutes = [
  {
    path: "auth/user",
    element: (
      <ProtectedRoute roles={["Admin", "Relationship Manager", "Manager", "Clerk"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <UserDashboard />,
      },
      {
        path: "add-customer",
        element: (
          <ProtectedRoute roles={["Admin"]}>
            <CreateCustomer />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "admin/dashboard",
    element: (
      <ProtectedRoute roles={["Admin"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <CustomerDashboard />,
      },
    ],
  },
];

export default PrivateRoutes;
