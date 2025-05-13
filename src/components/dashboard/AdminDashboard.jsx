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
import RepairCharts from "../charts/RepairCharts";
import useRepairBookingData from "../../hooks/useRepairBookingData";

const AdminDashboard = () => {
  useSalesData();
  usePurchaseData();
  useFetchInvoices();
  useRepairBookingData();
  useFetchPurchaseInvoices();
  
  const [salesData, setSalesData] = useState(0);
  const [purchaseData, setPurchaseData] = useState(0);
  const [expenseData, setExpenseData] = useState(0);
  const [repairData, setRepairData] = useState(0);

  const { last90DaysSaleData} = useSelector((state) => state.sales);
  const { last90DaysPurchaseData} = useSelector((state) => state.purchases);
  const { last90DaysRepairBookingData} = useSelector((state) => state.repairBooking);

  // Last 30 days ke liye data filter karein
  const last30DaysSalesData = last90DaysSaleData.slice(-30);
  const last30DaysPurchaseData = last90DaysPurchaseData.slice(-30);
  const last30DaysRepairBookingData = last90DaysRepairBookingData.slice(-30);

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

  // Repair data
  useEffect(() => {
    const calculateTotalRepair = () => {
      let total = 0;
      if (last30DaysRepairBookingData && last30DaysRepairBookingData.length > 0) {
        last30DaysRepairBookingData.forEach((repair) => {
          total += repair.totalRepairPrice || 0;
        });
      }
      
      setRepairData(total);
    };

    calculateTotalRepair();
  }, [last90DaysRepairBookingData]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-12 gap-4 bg-gray-100">
      <div className="col-span-3 p-4">
        <ButtonSection
          totalSales={salesData}
          totalPurchase={purchaseData}
          totalExpense={expenseData}
          totalRepairs={repairData}
        />
      </div>
      <div className="col-span-7 p-4">
        <SalesCharts />
        <RepairCharts/>
        <PurchaseCharts />
      </div>
      <div className="col-span-3 p-4">
      </div>
    </div>
  );
};

export default AdminDashboard;