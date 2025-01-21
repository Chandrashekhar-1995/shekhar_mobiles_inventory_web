import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ComingSoon from "../components/ComingSoon";


const SettingRoutes = [
  {
    path: "settings",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ComingSoon /> },
    ],
  },
];

export default SettingRoutes;
0