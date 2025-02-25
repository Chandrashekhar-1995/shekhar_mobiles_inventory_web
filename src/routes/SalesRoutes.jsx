import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import SalesDashboard from "../components/sales/SalesDashboard";
import CreateInvoice from "../components/sales/CreateInvoice";
import ComingSoon from "../components/ComingSoon";
import ManageInvoice from "../components/sales/ManageInvoice";


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
      { path: "invoice", element: <ManageInvoice/> },
      { path: "invoice/create", element: <CreateInvoice/> },
      { path: "invoice/search", element: <ComingSoon/> },
      { path: "edit/invoice/:id", element: <CreateInvoice isEditMode={true}/> },
      { path: "return", element: <ComingSoon/> },
      { path: "quotation", element: <ComingSoon/> },
      { path: "delivery_note", element: <ComingSoon/> },
      { path: "proforma_invoice", element: <ComingSoon/> },
      { path: "order", element: <ComingSoon/> },
      { path: "credit_note", element: <ComingSoon/> },
      { path: "debit_note", element: <ComingSoon/> },
    ],
  },
];

export default SalesRoutes;
0