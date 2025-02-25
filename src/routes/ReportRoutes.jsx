import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import ReportsDashboard from "../components/report/ReportsDashboard";
import AccountReports from "../components/report/account/AccountReports";
import ComingSoon from "../components/ComingSoon";


const ReportsRoutes = [
  {
    path: "reports",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ReportsDashboard /> },
      // { path: "create", element: <CreateSale /> },
    ],
  },
  {
    path: "reports/account/",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      // { path: "", element: <AccountReports /> },
      { path: "", element: <ComingSoon /> },
      { path: "cash_book", element: <ComingSoon/> },
      { path: "business_book", element: <ComingSoon/> },
      { path: "payment_paid", element: <ComingSoon/> },
      { path: "payment_recived", element: <ComingSoon/> },
      { path: "daily_summery", element: <ComingSoon/> },
      { path: "input_output_tax", element: <ComingSoon/> },
      { path: "profit_loss_summery", element: <ComingSoon/> },
      { path: "account_chart", element: <ComingSoon/> },
      { path: "balance-sheet", element: <ComingSoon/> },
    ],
  },
  {
    path: "reports/inventory",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ComingSoon /> },
    ],
  },
  {
    path: "reports/sales",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ComingSoon /> },
    ],
  },
  {
    path: "reports/purchases",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ComingSoon /> },
    ],
  },
  {
    path: "reports/customer",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ComingSoon /> },
    ],
  },
  {
    path: "reports/suppliers",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ComingSoon /> },
    ],
  },
  {
    path: "reports/expenses",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ComingSoon /> },
    ],
  },
  {
    path: "reports/staff",
    element: (
      <ProtectedRoute roles={["Admin", "Sales Executive"]}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <ComingSoon /> },
    ],
  },
  {
    path: "reports/gstr",
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

export default ReportsRoutes;
