import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const RepairCharts = ({ isMobile }) => {
  const { last90DaysRepairBookingData, loading, error } = useSelector((state) => state.repairBooking);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Generate complete date range for last 30 days
  const generateDateRange = () => {
    const dates = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    }
    return dates;
  };

  // Create data map for existing repair bookings
  const createDataMap = () => {
    const dataMap = new Map();
    last90DaysRepairBookingData?.forEach(repair => {
      const date = new Date(repair.date).toISOString().split('T')[0];
      dataMap.set(date, repair.totalRepairPrice);
    });
    return dataMap;
  };

  // Prepare chart data with 0 values for missing dates
  const prepareChartData = () => {
    const dateRange = generateDateRange();
    const dataMap = createDataMap();
    
    const labels = [];
    const dataPoints = [];
    
    dateRange.forEach(dateStr => {
      const date = new Date(dateStr);
      labels.push(`${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`);
      dataPoints.push(dataMap.get(dateStr) || 0);
    });

    return { labels, dataPoints };
  };

  const { labels, dataPoints } = prepareChartData();

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Daily Repair Booking",
        data: dataPoints,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      }
    ]
  };

  // Options remain the same as before
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
          <div className="h-64 md:h-96">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairCharts;