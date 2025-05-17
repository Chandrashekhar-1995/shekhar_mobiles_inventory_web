import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CombinedCharts = ({ isMobile }) => {
  const [selectedView, setSelectedView] = useState("all");
  
  // Redux data
  const { last90DaysSaleData } = useSelector((state) => state.sales);
  const { last90DaysPurchaseData } = useSelector((state) => state.purchases);
  const { last90DaysRepairBookingData } = useSelector((state) => state.repairBooking);

  // Generate 30 days date range
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

  // Create data maps for all categories
  const createDataMap = (data, key) => {
    const map = new Map();
    data?.forEach(item => {
      const date = new Date(item.date).toISOString().split('T')[0];
      map.set(date, item[key]);
    });
    return map;
  };

  // Prepare combined data
  const prepareChartData = () => {
    const dateRange = generateDateRange();
    
    const salesMap = createDataMap(last90DaysSaleData, 'totalSales');
    const purchaseMap = createDataMap(last90DaysPurchaseData, 'totalPurchases');
    const repairMap = createDataMap(last90DaysRepairBookingData, 'totalRepairPrice');

    const labels = [];
    const salesData = [];
    const purchaseData = [];
    const repairData = [];

    dateRange.forEach(dateStr => {
      const date = new Date(dateStr);
      labels.push(`${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`);
      
      salesData.push(salesMap.get(dateStr) || 0);
      purchaseData.push(purchaseMap.get(dateStr) || 0);
      repairData.push(repairMap.get(dateStr) || 0);
    });

    return { labels, salesData, purchaseData, repairData };
  };

  const { labels, salesData, purchaseData, repairData } = prepareChartData();

  // Dataset visibility logic
  const getVisibleDatasets = () => {
    const baseDatasets = [
      {
        label: "Sales",
        data: salesData,
        borderColor: "#3b82f6", // Blue
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        hidden: selectedView !== 'all' && selectedView !== 'sales',
        tension: 0.4,
      },
      {
        label: "Purchases",
        data: purchaseData,
        borderColor: "#ef4444", // Red
        backgroundColor: "rgba(239, 68, 68, 0.2)",
        hidden: selectedView !== 'all' && selectedView !== 'purchases',
        tension: 0.4,
      },
      {
        label: "Repairs",
        data: repairData,
        borderColor: "#22c55e", // Green
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        hidden: selectedView !== 'all' && selectedView !== 'repairs',
        tension: 0.4,
      }
    ];

    return baseDatasets.filter(dataset => !dataset.hidden);
  };

  const chartData = {
    labels,
    datasets: getVisibleDatasets()
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
        text: "Combined Financial Trends",
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
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-lg md:text-xl">Financial Trends</h2>
            <select 
              className="select select-bordered select-sm"
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
            >
              <option value="all">All</option>
              <option value="sales">Sales Only</option>
              <option value="purchases">Purchases Only</option>
              <option value="repairs">Repairs Only</option>
            </select>
          </div>
          <div className="h-64 md:h-96">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedCharts;