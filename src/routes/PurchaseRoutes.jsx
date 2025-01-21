import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import PurchaseDashboard from "../components/purchase/PurchaseDashboard";
import ComingSoon from "../components/ComingSoon";


const PurchaseRoutes = [
  {
    path: "purchase",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <PurchaseDashboard /> },
      { path: "invoice/create", element: <ComingSoon/> },
      { path: "invoice/search", element: <ComingSoon/> },
      { path: "order", element: <ComingSoon/> },
      { path: "return", element: <ComingSoon/> },
      { path: "debit_note", element: <ComingSoon/> },
      { path: "credit_note", element: <ComingSoon/> },
      { path: "supplier", element: <ComingSoon/> },
    ],
  },
];

export default PurchaseRoutes;
0