import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import UserDashboard from "../pages/UserDashboard";
import CreateUser from "../components/user/CreateUser";
import AdminDashboard from "../pages/AdminDashboard";
import UserProfile from "../components/user/UserProfile";
import CreateCustomer from "../components/customer/CreateCustomer";
import ComingSoon from "../pages/ComingSoon";
import CustomerDashboard from "../pages/CustomerDashboard";
import BulkUploadCustomer from "../components/customer/BulkUploadCustomer";

const UserRoutes = [
    {
        path: "auth/user",
        element: (
          <ProtectedRoute roles={["Admin", "Relationship Manager", "Marketing Executive", "Manager", "Accountant", "Clerk", "Peon", "Office Boy", "Receptionist", "Trainee"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { path: "",element: <UserDashboard/>},
          { path:"profile", element:<UserProfile />},
          { path: "create", element: 
            (
              <ProtectedRoute roles={["Admin"]}>
                <CreateUser/>
              </ProtectedRoute>
            ),
          },
          { path: "manage", element: 
            (
              <ProtectedRoute roles={["Admin"]}>
                <ComingSoon/>
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
          { path: "", element: <AdminDashboard/>},
        ],
    },
    {
      path: "auth/user/customer",
      element: (
        <ProtectedRoute roles={["Admin", "Relationship Manager", "Marketing Executive", "Manager", "Accountant", "Clerk", "Peon", "Office Boy", "Receptionist", "Trainee"]}>
          <Outlet />
        </ProtectedRoute>
      ),
      children: [
        { path: "", element: <CustomerDashboard/> },
        { path: "create", element: <CreateCustomer/> },
        { path: "bulk-upload", element: <BulkUploadCustomer/> },
        { path: "loan", element: <ComingSoon/> },
      ],
    },
];

export default UserRoutes;