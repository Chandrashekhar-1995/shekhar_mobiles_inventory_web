import React from "react";
import DashboardCharts from "../charts/DashboardCharts";
import useFetchInvoices from "../../hooks/useFetchInvoices";
import useFetchPurchaseInvoices from "../../hooks/useFetchPurchaseInvoice";
import PurchaseCharts from "../charts/PurchaseCharts";

const AdminDashboard = () => {
  useFetchInvoices();
  useFetchPurchaseInvoices();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <DashboardCharts />
      <PurchaseCharts/>
    </div>
  );
}

export default AdminDashboard;