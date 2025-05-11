import React, { useState, useEffect } from "react"; // useState और useEffect आयात करें
import useFetchInvoices from "../../hooks/useFetchInvoices";
import useFetchPurchaseInvoices from "../../hooks/useFetchPurchaseInvoice";
import PurchaseCharts from "../charts/PurchaseCharts";
import SalesCharts from "../charts/SalesCharts";
import ButtonSection from "./ButtonSection";
import useSalesData from "../../hooks/useSalesData";
import usePurchaseData from "../../hooks/usePurchaseData";
import { useSelector } from "react-redux";
import { data } from "react-router-dom";

const AdminDashboard = () => {
  useSalesData();
  usePurchaseData();
  useFetchInvoices();
  useFetchPurchaseInvoices();
  
  const [salesData, setSalesData] = useState(0);
  const [purchaseData, setPurchaseData] = useState(0);
  const [expenseData, setExpenseData] = useState(0);

  const { last90DaysSaleData, todaySaleSummary } = useSelector((state) => state.sales);
  const { last90DaysPurchaseData, todayPurchaseSummary} = useSelector((state) => state.purchases);

  // Last 30 days ke liye data filter karein
  const last30DaysSalesData = last90DaysSaleData.slice(-30);
  const last30DaysPurchaseData = last90DaysPurchaseData.slice(-30);

  // set sale data
  useEffect(() => {
    const calculateTotalSales = () => {
      let total = 0;
      if (last30DaysSalesData && last30DaysSalesData.length > 0) {
        last30DaysSalesData.forEach((invoice) => {
          total += invoice.totalSales || 0;
        });
      }
      setSalesData(total);
    };

    calculateTotalSales();
  }, [last90DaysSaleData]);

  // Expanses data
  useEffect(() => {
    const fetchExpenseData = async () => {
      setExpenseData(100);
    };

    fetchExpenseData();
  }, []);

  // Set Purchase data
  useEffect(() => {
    const calculateTotalPurchase = () => {
      let total = 0;
      if (last30DaysPurchaseData && last30DaysPurchaseData.length > 0) {
        last30DaysPurchaseData.forEach((invoice) => {
          total += invoice.totalPurchases || 0;
        });
      }
      
      setPurchaseData(total);
    };

    calculateTotalPurchase();
  }, [last90DaysPurchaseData]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-12 gap-4 bg-gray-100">
      <div className="col-span-3 p-4">
        <ButtonSection
          totalSales={salesData}
          totalPurchase={purchaseData}
          totalExpense={expenseData}
        />
      </div>
      <div className="col-span-7 p-4">
        <SalesCharts />
        <PurchaseCharts />
      </div>
      <div className="col-span-3 p-4">
      </div>
    </div>
  );
};

export default AdminDashboard;