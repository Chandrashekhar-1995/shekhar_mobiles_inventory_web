import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';
import usePurchaseData from '../../hooks/usePurchaseData';
import { useSelector } from 'react-redux';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PurchaseCharts = () => {
  usePurchaseData();
  
  const { last90DaysData, todaySummary, loading, error } = useSelector((state) => state.purchases);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Last 30 days data
  const last30DaysData = last90DaysData.slice(-30);

  // Chart data
  const chartData = {
    labels: last30DaysData.map(item => {
      const date = new Date(item.date);
      return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
    }),
    datasets: [
      {
        label: 'Daily Purchases',
        data: last30DaysData.map(item => item.totalPurchases),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
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
        text: 'Last 30 Days Purchase Trend'
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

  if (loading) return <div className="text-center py-4">Loading purchase data...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="space-y-6">
      {/* Today's Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stats bg-accent text-accent-content shadow">
          <div className="stat">
            <div className="stat-title">Today's Purchases</div>
            <div className="stat-value">₹{todaySummary.totalPurchases}</div>
          </div>
        </div>
        
        <div className="stats bg-info text-info-content shadow">
          <div className="stat">
            <div className="stat-title">Today's Invoices</div>
            <div className="stat-value">{todaySummary.invoiceCount}</div>
          </div>
        </div>
      </div>

      {/* Purchase Trend Chart */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Purchase Trend (Last 30 Days)</h2>
          <div className="h-96">
            <Line data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseCharts;