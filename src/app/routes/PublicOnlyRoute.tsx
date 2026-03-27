import { Navigate, Outlet } from "react-router-dom";

import { ROUTES } from "@/app/routes/paths";
import { useAuth } from "@/features/auth/context/AuthContext";

export function PublicOnlyRoute() {
  const { isAuthenticated, isReady, user } = useAuth();

  if (!isReady) {
    return null;
  }

  if (isAuthenticated && user) {
    const destination =
      user.role === "doctor" ? ROUTES.doctorDashboard : ROUTES.userDashboard;

    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}
