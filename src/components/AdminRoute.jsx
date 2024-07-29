import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children, role }) => {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('userRole');

  if (!token || (role && userRole !== role)) {
    // If no token or role doesn't match, redirect to login
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
