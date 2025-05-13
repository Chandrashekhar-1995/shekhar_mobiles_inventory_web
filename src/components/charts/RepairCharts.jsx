import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RepairCharts = ({isMobile}) => {

  const { last90DaysRepairBookingData, loading, error } = useSelector((state) => state.repairBooking);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Last 30 days ke liye data filter karein
  const last30DaysData = last90DaysRepairBookingData?.slice(-30);

  // Chart data prepare karein
  const chartData = {
    labels: last30DaysData?.map(item => {
      const date = new Date(item.date);
      return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
    }),
    datasets: [
      {
        label: "Daily Repair Booking", 
        data: last30DaysData?.map(repair => repair.totalRepairPrice),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
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
        text: "Last 30 Days Repair Booking Trend",
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

  return (
    <div className="space-y-6 my-4">
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title text-lg md:text-xl">Repair Booking Trend</h2>
          <div className="h-64 md:h-96"> {/* Responsive height */}
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairCharts;