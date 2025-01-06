import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import UserDashboard from "../components/user/UserDashboard";
import CreateCustomerPc from "../components/dextop/customer/CreateCustomer";
import CreateUser from "../components/user/CreateUser";
import Admin from "../components/user/Admin";
import AdminDashboardPc from "../components/dextop/user/AdminDashboard";
import CustomerDashboard from "../components/customer/CustomerDashboard";


const UserRoutes = [
    {
        path: "auth/user",
        element: (
          <ProtectedRoute roles={["Admin", "Relationship Manager", "Marketing Executive", "Manager", "Accountant", "Clerk", "Peon", "Office Boy", "Receptionist", "Trainee"]}>
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
        path: "user", //for customer route
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <CustomerDashboard />,
          },
        ],
    },
];

export default UserRoutes;