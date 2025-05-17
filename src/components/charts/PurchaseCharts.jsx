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

  // Generate complete date range for last 30 days
  const generateDateRange = () => {
    const dates = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  // Create data map for existing purchases
  const createDataMap = () => {
    const dataMap = new Map();
    last90DaysPurchaseData?.forEach(item => {
      const date = new Date(item.date).toISOString().split('T')[0];
      dataMap.set(date, item.totalPurchases);
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
        label: "Daily Purchases",
        data: dataPoints,
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
          <div className="h-64 md:h-96">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCharts;