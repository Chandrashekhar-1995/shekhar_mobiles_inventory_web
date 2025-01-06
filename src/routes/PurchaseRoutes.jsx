import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
// import SalesDashboard from "../components/sales/SalesDashboard";
// import CreateSale from "../components/sales/CreateSale";

const PurchaseRoutes = [
  {
    path: "purchase",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    // children: [
    //   { path: "", element: <SalesDashboard /> },
    //   { path: "create", element: <CreateSale /> },
    // ],
  },
];

export default PurchaseRoutes;
0