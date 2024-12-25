
import React from "react";
import { Box, Grid, Card, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const AdminDashboard = () => {
  // Mock Data
  const weekSalesData = [
    { day: "Mon", sales: 200 },
    { day: "Tue", sales: 300 },
    { day: "Wed", sales: 500 },
    { day: "Thu", sales: 400 },
    { day: "Fri", sales: 600 },
    { day: "Sat", sales: 700 },
    { day: "Sun", sales: 800 },
  ];

  const monthlyData = [
    { name: "Purchases", value: 400 },
    { name: "Sales", value: 300 },
    { name: "Expenses", value: 300 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

  return (
    <Box className="p-6 bg-gray-100 min-h-screen">
      <Typography variant="h4" className="font-bold mb-6">
        Admin Dashboard
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={4} className="mb-6">
        <Grid item xs={12} md={4}>
          <Card className="p-4 shadow-lg">
            <Typography variant="h6" className="font-semibold text-gray-700">
              Total Sales
            </Typography>
            <Typography variant="h4" className="font-bold text-blue-600">
              ₹50,000
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="p-4 shadow-lg">
            <Typography variant="h6" className="font-semibold text-gray-700">
              Total Purchases
            </Typography>
            <Typography variant="h4" className="font-bold text-green-600">
              ₹30,000
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="p-4 shadow-lg">
            <Typography variant="h6" className="font-semibold text-gray-700">
              Total Expenses
            </Typography>
            <Typography variant="h4" className="font-bold text-red-600">
              ₹20,000
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={4}>
        {/* Bar Chart for Weekly Sales */}
        <Grid item xs={12} md={8}>
          <Card className="p-4 shadow-lg">
            <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
              Weekly Sales Report
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weekSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Pie Chart for Monthly Ratios */}
        <Grid item xs={12} md={4}>
          <Card className="p-4 shadow-lg">
            <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
              Monthly Ratio
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={monthlyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {monthlyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>

      {/* Add More Analytics */}
      <Grid container spacing={4} className="mt-6">
        <Grid item xs={12} md={6}>
          <Card className="p-4 shadow-lg">
            <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
              Inventory Status
            </Typography>
            <Typography>
              Coming soon: Detailed inventory analytics here.
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="p-4 shadow-lg">
            <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
              Customer Overview
            </Typography>
            <Typography>
              Coming soon: Insights on customer engagement and performance.
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
