import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginForm/>} />
      <Route path="/dashboard" element={<PrivateRoute/>} />

      {/* Protected Routes */}
      {/* <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
      <Route path="/logout" element={<PrivateRoute component={Logout} />} /> */}

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}

export default AppRoutes