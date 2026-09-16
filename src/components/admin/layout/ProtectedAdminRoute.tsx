import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDemoAuth } from '../../../context/DemoAuthContext';

interface ProtectedAdminRouteProps {
  children: React.ReactElement;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { isAuthenticated } = useDemoAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to landing / login page if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
