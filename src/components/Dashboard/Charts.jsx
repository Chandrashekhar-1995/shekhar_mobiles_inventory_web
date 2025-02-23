import React from 'react';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample data for charts
const pieData = [
  { name: 'Paid', value: 1100 },
  { name: 'Due', value: 2000 },
  { name: 'Overdue', value: 1300 },
];

const lineData = [
  { date: '19 Jan 25', amountIn: 800, amountOut: 600 },
  { date: '26 Jan 25', amountIn: 1200, amountOut: 400 },
  { date: '02 Feb 25', amountIn: 1400, amountOut: 200 },
  { date: '09 Feb 25', amountIn: 1000, amountOut: 500 },
  { date: '16 Feb 25', amountIn: 1300, amountOut: 300 },
];

const Charts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Pie Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-2">Business Insights</h3>
        <PieChart width={300} height={200}>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#82ca9d"
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>

      {/* Line Chart */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-bold mb-2">Recent Activity</h3>
        <LineChart width={500} height={200} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amountIn" stroke="#8884d8" />
          <Line type="monotone" dataKey="amountOut" stroke="#ff7300" />
        </LineChart>
      </div>
    </div>
  );
};

export default Charts;