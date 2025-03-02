// src/context/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(AuthContext);

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and the user's roleId doesn't match, redirect to home
  if (requiredRole && user.roleId !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and role matches (or no role check needed), render the children
  return children;
};

export default ProtectedRoute;