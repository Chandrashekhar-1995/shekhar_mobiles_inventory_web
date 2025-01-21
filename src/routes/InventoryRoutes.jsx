import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ComingSoon from "../components/ComingSoon";
import InventoryDashboard from "../components/inventory/InventoryDashboard";


const InventoryRoutes = [
  {
    path: "inventory",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <InventoryDashboard /> },
      { path: "add_stock_adjustment", element: <ComingSoon/> },
      { path: "search_stock_adjustment", element: <ComingSoon/> },
      { path: "stock_reconciliation", element: <ComingSoon/> },
      { path: "low-stock", element: <ComingSoon/> },
    ],
  },
];

export default InventoryRoutes;
0