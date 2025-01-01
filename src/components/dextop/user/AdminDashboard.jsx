import React from "react";
import { Grid } from "@mui/material";
import Sidebar from "../../Sidebar";
import QuickInfo from "../../QuickInfo";
import ActionButtons from "../../ActionButtons";
import PieChartComponent from "../../PieChartComponent";
import BarChartComponent from "../../BarChartComponent";

const Dashboard = () => {
  // Mock Data
  const salesData = [
    { name: "Day 1", sales: 0.6 },
    { name: "Day 2", sales: 0.4 },
    { name: "Day 3", sales: 0.2 },
    { name: "Day 4", sales: 3.1 },
    { name: "Day 5", sales: 0.8 },
    { name: "Day 6", sales: 0.3 },
    { name: "Day 7", sales: 0.5 },
  ];

  const ratioData = [
    { name: "Sales", value: 40 },
    { name: "Purchases", value: 35 },
    { name: "Expenses", value: 25 },
  ];

  const COLORS = ["#4caf50", "#2196f3", "#f44336"];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      {/* Sidebar 2/6 hissa of screen*/}
      <div className="w-3/12 p-4">
        {/* Quick Info */}
        <Grid item xs={12} sm={4}>
          <QuickInfo grossSale={50000} amountReceived={30000} amountDue={20000} />
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} sm={8}>
          <ActionButtons />
        </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
          <PieChartComponent data={ratioData} colors={COLORS} title="Last 30 Days Ratio" />
        </Grid>
      </div>

      {/* Bar graph 3/6 hissa of screen*/}
      <div className="w-2/6 p-4">
        <Grid item xs={12} md={8}>
          <BarChartComponent data={salesData} title="Last 15 Days Sales" />
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
