import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import SalesDashboard from "../components/sales/SalesDashboard";
import CreateInvoice from "../components/sales/CreateInvoice";
;

const SalesRoutes = [
  {
    path: "sales",
    element: (
      <ProtectedRoute roles={["Admin", "Relationship Manager", "Marketing Executive", "Manager", "Accountant", "Clerk", "Peon", "Office Boy", "Receptionist", "Trainee"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <SalesDashboard /> },
      { path: "invoice/create", element: <CreateInvoice/> },
      // { path: "invoice/search", element: <CreateInvoice/> },
    ],
  },
];

export default SalesRoutes;
0