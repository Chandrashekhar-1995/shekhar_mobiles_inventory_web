import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BusinessInsightsPieChart = ({ sales, purchase, expense }) => {
  const data = {
    labels: ["Sales", "Purchase", "Expenses"],
    datasets: [
      {
        label: "Sale Purchase Expense Ratio",
        data: [sales, purchase, expense],
        backgroundColor: [
          "rgba(54, 162, 235, 0.8)", // blue for sales
          "rgba(255, 99, 132, 0.8)", // red for purchase
          "rgba(255, 255, 0, 0.8)",   // yellow for expenses
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 255, 0, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.dataset.data[context.dataIndex];
            const total = context.dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return `${label}: ${value} (${percentage})`;
          },
        },
      },
    },
  };

  return (
    <div className="border">
      <h2 className="bg-primary text-white p-2 mb-4">Sale Purchase Expense Ratio</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default BusinessInsightsPieChart;