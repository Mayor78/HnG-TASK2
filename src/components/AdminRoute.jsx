import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const AdminRoute = ({ children }) => {
  const { user } = useUser();

  // Redirect to login if not logged in or not an admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
