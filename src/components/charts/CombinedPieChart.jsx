import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CombinedPieChart = ({ sales, purchase, expense, repairs, isMobile }) => {
  const [chartType, setChartType] = useState("repairSales");

  const chartConfig = {
    repairSales: {
      labels: ["Sales", "Repairs"],
      chartData: [sales, repairs],
      colors: [
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
      ],
      borderColors: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      title: "Sale Repair Ratio"
    },
    businessInsights: {
      labels: ["Sales", "Purchase", "Expenses"],
      chartData: [sales, purchase, expense],
      colors: [
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 99, 132, 0.8)",
        "rgba(75, 192, 192, 0.8)",
      ],
      borderColors: [
        "rgba(54, 162, 235, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      title: "Business Insights"
    }
  };

  const { labels, chartData, colors, borderColors, title } = chartConfig[chartType];

  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: chartData, // Use renamed variable here
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? "bottom" : "right",
        labels: {
          font: {
            size: isMobile ? 12 : 14
          }
        }
      },
      tooltip: {
        bodyFont: {
          size: isMobile ? 12 : 14
        }
      }
    }
  };

  return (
    <div className="border my-4">
      <div className="bg-primary text-white p-2 mb-4 flex justify-between items-center">
        <h2 className="text-sm md:text-base">{title}</h2>
        <select 
          className="select select-bordered select-xs text-black"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="repairSales">Sales vs Repairs</option>
          <option value="businessInsights">Business Insights</option>
        </select>
      </div>
      <div className="h-64 md:h-96 p-2">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default CombinedPieChart;