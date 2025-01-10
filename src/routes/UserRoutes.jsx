import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import UserDashboard from "../components/user/UserDashboard";
import CreateUser from "../components/user/CreateUser";
import Admin from "../components/user/Admin";
import AdminDashboardPc from "../components/dextop/user/AdminDashboard";
import UserProfile from "../components/user/UserProfile";
import CreateCustomerPc from "../components/dextop/customer/CreateCustomer";
import CreateCustomer from "../components/customer/CreateCustomer";


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
            element: <UserDashboard/>,
          },
          {
            path:"profile",
            element:<UserProfile />
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
      path: "auth/user/customer",
      element: (
        <ProtectedRoute roles={["Admin", "Relationship Manager", "Marketing Executive", "Manager", "Accountant", "Clerk", "Peon", "Office Boy", "Receptionist", "Trainee"]}>
          <Outlet />
        </ProtectedRoute>
      ),
      children: [
        { 
          path: "",
          element: <CreateCustomer/>,
        },
        {
          path: "add",
          element: (
            <ProtectedRoute>
              <CreateCustomerPc /> 
            </ProtectedRoute>
          ),
        },
        {
          path: "create",
          element: (
            <ProtectedRoute>
              <CreateCustomer/>
            </ProtectedRoute>
          ),
        },
      ],
    },
];

export default UserRoutes;