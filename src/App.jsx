import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import CustomerPage from './pages/CustomerPage';
import PrivateRoute from './routes/PrivateRoute';
import AdminOnlyRoute from './routes/AdminOnlyRoute';
import AdminAndUserRoute from './routes/AdminAndUserRoute';
import CustomerRoute from './routes/CustomerRoute';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <AdminAndUserRoute>
              <Dashboard />
            </AdminAndUserRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminOnlyRoute>
              <AdminDashboard />
            </AdminOnlyRoute>
          }
        />
        <Route
          path="/customer"
          element={
            <CustomerRoute>
              <CustomerPage />
            </CustomerRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;