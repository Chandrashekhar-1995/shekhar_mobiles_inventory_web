import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import CustomerDashboard from "../components/customer/CustomerDashboard";
import CustomerProfile from "../components/customer/CustomerProfile";
import HomePage from "../pages/HomePage";

const CustomerRoutes = [
  {
    path: "user", //for customer route
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path:"",
        element:<HomePage/>
      },
      {
        path:"profile",
        element:<CustomerProfile/>
      },
      {
        path: "dashboard",
        element: <CustomerDashboard />,
      },
    ],
},
];

export default CustomerRoutes;