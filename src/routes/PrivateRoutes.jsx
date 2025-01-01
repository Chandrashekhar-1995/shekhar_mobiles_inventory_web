import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import CustomerDashboard from "../components/customer/CustomerDashboard";
import AdminDashboardPc from "../components/dextop/user/AdminDashboard";
import CreateCustomerPc from "../components/dextop/customer/CreateCustomer";
import UserDashboard from "../components/user/UserDashboard";
import useAuth from "../hooks/useAuth";
import CreateUser from "../components/user/CreateUser";
import Admin from "../components/user/Admin";

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
          <ProtectedRoute>
            <CreateCustomerPc />
          </ProtectedRoute>
        ),
      },
      {
        path: "create",
        element: (
          <ProtectedRoute roles={["Admin"]}>
            <CreateUser/>
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "auth/admin",
    element: (
      <ProtectedRoute roles={["Admin"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Admin/>,
      },
      {
        path: "dashboard",
        element: <AdminDashboardPc />,
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
