import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Dashboard from '../components/Dashboard/Dashboard';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Hitech BillSoft 8.9 - Chandra Shekhar Paswan - Shekhar Mobile Shop (CHANDRA)</h1>
        <Dashboard />
      </main>
    </div>
  );
};

export default AdminDashboard;