import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CustomerRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user?.role === 'customer' ? children : <Navigate to="/login" />;
};

export default CustomerRoute;