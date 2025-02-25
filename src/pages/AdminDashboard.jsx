import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const AdminDashboard = () => {
  return (
    <div className="flex pt-16">
      <Sidebar />
      <div className="flex-1 ml-64 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;