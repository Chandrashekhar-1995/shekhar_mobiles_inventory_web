import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminOnlyRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user?.role === 'admin' ? children : <Navigate to="/login" />;
};

export default AdminOnlyRoute;