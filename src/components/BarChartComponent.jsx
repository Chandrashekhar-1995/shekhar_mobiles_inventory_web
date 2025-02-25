import React from "react";
import { Card, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const BarChartComponent = ({ data, title }) => {
  return (
    <Card className="p-4 shadow-lg">
      <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
        {title}
      </Typography>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#8884d8" />
      </BarChart>
    </Card>
  );
};

export default BarChartComponent;