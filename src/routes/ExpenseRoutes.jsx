import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import PurchaseDashboard from "../components/purchase/PurchaseDashboard";
import ComingSoon from "../components/ComingSoon";


const ExpenseRoutes = [
  {
    path: "expense",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
    //   { path: "", element: <PurchaseDashboard /> },
      { path: "direct", element: <ComingSoon/> },
      { path: "indirect", element: <ComingSoon/> },
    ],
  },
];

export default ExpenseRoutes;
0