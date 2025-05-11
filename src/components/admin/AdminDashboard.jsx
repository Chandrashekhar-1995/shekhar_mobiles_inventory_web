import React from "react";
import useFetchInvoices from "../../hooks/useFetchInvoices";
import useFetchPurchaseInvoices from "../../hooks/useFetchPurchaseInvoice";
import PurchaseCharts from "../charts/PurchaseCharts";
import SalesCharts from "../charts/SalesCharts";

const AdminDashboard = () => {
  useFetchInvoices();
  useFetchPurchaseInvoices();
  return (
    <div className="container mx-auto p-4 grid grid-cols-12 gap-4">
      <div className="col-span-3 bg-gray-100 p-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          बटन 1
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2">
          बटन 2
        </button>
      </div>
      <div className="col-span-7">
        <SalesCharts />
        <PurchaseCharts />
      </div>
      <div className="col-span-3 bg-gray-100 p-4">
      </div>
    </div>
  );
};

export default AdminDashboard;