import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import CreateService from "../components/service/CreateService";
import ComingSoon from "../components/ComingSoon";

const ServiceRoutes = [
  {
    path: "service",
    element: (
      <ProtectedRoute roles={["Admin", "Relationship Manager", "Marketing Executive", "Manager", "Accountant", "Clerk", "Peon", "Office Boy", "Receptionist", "Trainee"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ComingSoon/> },
      { path: "create", element: <ComingSoon/> },
    ],
  },
];

export default ServiceRoutes;
0