import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PurchaseCharts = ({ isMobile }) => {  
  const { last90DaysPurchaseData, loading, error } = useSelector((state) => state.purchases);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Last 30 days data
  const last30DaysPurchaseData = last90DaysPurchaseData.slice(-30);

  // Chart data
  const chartData = {
    labels: last30DaysPurchaseData.map(item => {
      const date = new Date(item.date);
      return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
    }),
    datasets: [
      {
        label: "Daily Purchases",
        data: last30DaysPurchaseData.map(item => item.totalPurchases),
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: isMobile ? 12 : 14
          }
        }
      },
      title: {
        display: true,
        text: "Last 30 Days Purchase Trend",
        font: {
          size: isMobile ? 16 : 18
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: {
            size: isMobile ? 10 : 12
          }
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value}`,
          font: {
            size: isMobile ? 10 : 12
          }
        }
      }
    }
  };


  if (loading) return <div className="text-center py-4">Loading purchase data...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="space-y-6 my-4">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title text-lg md:text-xl">Purchase Trend</h2>
          <div className="h-64 md:h-96"> {/* Responsive height */}
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCharts;