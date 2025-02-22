import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import PurchaseDashboard from "../components/purchase/PurchaseDashboard";
import CreatePurchaseInvoice from "../components/purchase/CreatePurchaseInvoice";
import ComingSoon from "../components/ComingSoon";
import SupplierDashboard from "../components/supplier/SupplierDashboard";
import SupplierProfile from "../components/supplier/SupplierProfile";
import CreateSupplier from "../components/supplier/CreateSupplier";
import Purchase from "../components/purchase/Purchase";


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
      { path: "invoice/create", element: <CreatePurchaseInvoice/> },
      { path: "invoice", element: <Purchase/> },
      { path: "invoice/search", element: <ComingSoon/> },
      { path: "order", element: <ComingSoon/> },
      { path: "return", element: <ComingSoon/> },
      { path: "debit-note", element: <ComingSoon/> },
      { path: "credit-note", element: <ComingSoon/> },
      { path: "supplier", element: <SupplierDashboard/> },
      { path: "supplier/:id", element: <SupplierProfile/> },
      { path: "supplier/create", element: <CreateSupplier/> },
    ],
  },
];

export default PurchaseRoutes;
0