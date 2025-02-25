import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen pt-20 fixed">
      <ul className="menu p-4">
        <li><Link to="/admin/create-invoice">Create Invoice</Link></li>
        <li><Link to="/admin/purchase">Purchase</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;