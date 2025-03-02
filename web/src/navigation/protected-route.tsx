import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { handleLogout } from "../redux/slices/auth/auth.util";

export const ProtectedRoute: FC<{ children: ReactNode }> = ({
    children,
  }) => {
    const token = localStorage.getItem("token");
    if (token) {
      return children;
    }
    handleLogout();
    return <Navigate to="/login" replace />;
  };