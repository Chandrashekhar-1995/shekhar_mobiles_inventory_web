import React from "react";
import { Grid, Card, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from "recharts";
import Sidebar from "../Sidebar";
import QuickInfo from "../QuickInfo";
import ActionButtons from "../ActionButtons";


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
    { name: "Day 8", sales: 0.6 },
    { name: "Day 9", sales: 0.4 },
    { name: "Day 10", sales: 0.2 },
    { name: "Day 11", sales: 3.1 },
    { name: "Day 12", sales: 0.8 },
    { name: "Day 13", sales: 0.3 },
    { name: "Day 14", sales: 0.5 },
  ];

  const ratioData = [
    { name: "Sales", value: 40 },
    { name: "Purchases", value: 35 },
    { name: "Expenses", value: 25 },
  ];

  const COLORS = ["#4caf50", "#2196f3", "#f44336"];

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar/>

      {/* Sidebar 2/6 hissa of screen*/}
        <div className="w-3/12 p-4">

        {/* Quick Info */}
          <Grid item xs={12} sm={4}>
            <QuickInfo grossSale={50000} amountReceived={30000} amountDue={20000} />
          </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} sm={8}>
            <ActionButtons/>
          </Grid>

        {/* Pie Chart */}
        <Grid item xs={12} md={4}>
            <Card className="p-4 shadow-lg">
              <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
                Last 30 Days Ratio
              </Typography>
              <PieChart width={300} height={300}>
                <Pie
                  data={ratioData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {ratioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </Card>
          </Grid>
      </div>

      {/* Bar graph 3/6 hissa of screen*/}
      <div className="w-2/6 p-4">
        {/* <Grid container spacing={4}> */}
          {/* Bar Chart */}
          <Grid item xs={12} md={8}>
            <Card className="p-4 shadow-lg">
              <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
                Last 15 Days Sales
              </Typography>
              <BarChart width={600} height={300} data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </Card>
          </Grid>
        {/* </Grid> */}
      </div>
    </div>
  );
};

export default Dashboard;
