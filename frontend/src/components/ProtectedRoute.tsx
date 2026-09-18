import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { obtenerToken } from "../services/authService";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({
  children
}: ProtectedRouteProps) {
  const token = obtenerToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;