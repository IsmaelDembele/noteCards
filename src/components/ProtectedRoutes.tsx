import React from "react";
import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  isLogged: boolean;
}

const ProtectedRoutes: React.FC<IProtectedRoute | any> = ({ isLogged, children }) => {
  if (!isLogged) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoutes;
