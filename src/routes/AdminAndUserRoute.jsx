import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminAndUserRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user && (user.role === 'admin' || user.role === 'user') ? children : <Navigate to="/login" />;
};

export default AdminAndUserRoute;