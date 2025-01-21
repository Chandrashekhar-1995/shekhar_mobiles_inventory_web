import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import PurchaseDashboard from "../components/purchase/PurchaseDashboard";
import ComingSoon from "../components/ComingSoon";


const ToolsRoutes = [
  {
    path: "tools",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ComingSoon /> },
      { path: "reminders", element: <ComingSoon/> },
      { path: "send_sms", element: <ComingSoon/> },
      { path: "send_gmail", element: <ComingSoon/> },
      { path: "gst_calculator", element: <ComingSoon/> },
      { path: "barcode_generator", element: <ComingSoon/> },
    ],
  },
];

export default ToolsRoutes;
0