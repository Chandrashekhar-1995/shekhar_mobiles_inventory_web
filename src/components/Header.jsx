import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 fixed top-0 left-0 right-0 z-50">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">MyApp</Link>
      </div>
      <div className="flex-none">
        {isAuthenticated ? (
          <>
            {user?.role === 'admin' && (
              <Link to="/admin" className="btn mr-2">Admin Dashboard</Link>
            )}
            {(user?.role === 'admin' || user?.role === 'user') && (
              <Link to="/dashboard" className="btn mr-2">Dashboard</Link>
            )}
            {user?.role === 'customer' && (
              <Link to="/customer" className="btn mr-2">Customer Page</Link>
            )}
            <button className="btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Header;