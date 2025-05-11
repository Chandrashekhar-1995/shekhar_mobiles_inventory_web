import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";
import useSalesData from "../../hooks/useSalesData";
import { useSelector } from "react-redux";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesCharts = () => {
  useSalesData();
  
  const { last90DaysData, todaySummary, loading, error } = useSelector((state) => state.sales);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Last 30 days ke liye data filter karein
  const last30DaysData = last90DaysData.slice(-30);

  // Chart data prepare karein
  const chartData = {
    labels: last30DaysData.map(item => {
      const date = new Date(item.date);
      return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
    }),
    datasets: [
      {
        label: 'Daily Sales',
        data: last30DaysData.map(item => item.totalSales),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Last 30 Days Sales Trend'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value}`
        }
      }
    }
  };

  if (loading) return <div className="text-center py-4">Loading sales data...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Today's Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stats bg-primary text-primary-content shadow">
          <div className="stat">
            <div className="stat-title text-white">Today's Sales</div>
            <div className="stat-value">₹{todaySummary.totalSales}</div>
          </div>
        </div>
        
        <div className="stats bg-secondary text-secondary-content shadow">
          <div className="stat">
            <div className="stat-title text-white">Today's Invoices</div>
            <div className="stat-value">{todaySummary.invoiceCount}</div>
          </div>
        </div>
      </div>

      {/* Sales Trend Chart */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Sales Trend (Last 30 Days)</h2>
          <div className="h-96">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesCharts;