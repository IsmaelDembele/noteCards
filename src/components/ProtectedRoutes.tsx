import React from "react";
import { Navigate } from "react-router-dom";
import { routes } from "../utils/constantes/constantes";

interface IProtectedRoute {
  isLogged: boolean;
}

const ProtectedRoutes: React.FC<IProtectedRoute | any> = ({ isLogged, children }) => {
  if (!isLogged) return <Navigate to={routes.signin} replace />;
  return children;
};

export default ProtectedRoutes;
