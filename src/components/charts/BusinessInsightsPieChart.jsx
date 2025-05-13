import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BusinessInsightsPieChart = ({ sales, purchase, expense, isMobile }) => {
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
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? "bottom" : "right", // Responsive position
        labels: {
          font: {
            size: isMobile ? 12 : 14
          }
        }
      },
      tooltip: {
        bodyFont: {
          size: isMobile ? 12 : 14
        },
        // ... rest of tooltip config same ...
      }
    }
  };

  return (
    <div className="border my-4">
      <h2 className="bg-primary text-white p-2 mb-4 text-sm md:text-base">
        Sale Purchase Expense Ratio
      </h2>
      <div className="h-64 md:h-96 p-2"> {/* Responsive container */}
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default BusinessInsightsPieChart;