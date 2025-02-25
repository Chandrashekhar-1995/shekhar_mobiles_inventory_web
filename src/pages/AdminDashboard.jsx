import React from 'react';
import Sidebar from '../components/dextop/SidebarForDextop';
import ActionButtons from '../components/ActionButtons';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar/>
      <main className="flex-1 p-4 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Hitech BillSoft 8.9 - Chandra Shekhar Paswan - Shekhar Mobile Shop (CHANDRA)</h1>
        {/* <Dashboard /> */}
        <ActionButtons/>
      </main>
    </div>
  );
};

export default AdminDashboard;