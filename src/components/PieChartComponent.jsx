import React from "react";
import { Card, Typography } from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";

const PieChartComponent = ({ data, colors, title }) => {
  return (
    <Card className="p-4 shadow-lg">
      <Typography variant="h6" className="font-semibold text-gray-700 mb-4">
        {title}
      </Typography>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </Card>
  );
};

export default PieChartComponent;