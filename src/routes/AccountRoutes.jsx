import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ComingSoon from "../components/ComingSoon";


const AccountRoutes = [
  {
    path: "account",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "bank_account", element: <ComingSoon/> },
      { path: "loan_account", element: <ComingSoon/> },
      { path: "asset_account", element: <ComingSoon/> },
      { path: "capital_account", element: <ComingSoon/> },
      { path: "other_incom_account", element: <ComingSoon/> },
      { path: "tax_payment", element: <ComingSoon/> },
    ],
  },
];

export default AccountRoutes;
0