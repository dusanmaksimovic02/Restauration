import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Props = { children: React.ReactNode };

const ProtectedPanel = ({ children }: Props) => {
  const location = useLocation();
  const { role } = useAuth();
  return role === "Admin" || role === "Manager" ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedPanel;
