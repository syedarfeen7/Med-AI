import { Navigate, Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "@/app/routes/paths";
import { useAuth } from "@/features/auth/context/AuthContext";

type ProtectedRouteProps = {
  allowedRoles?: Array<"patient" | "doctor">;
};

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, isReady, user } = useAuth();

  if (!isReady) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace state={{ from: location }} />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    const fallbackRoute =
      user.role === "doctor" ? ROUTES.doctorDashboard : ROUTES.userDashboard;

    return <Navigate to={fallbackRoute} replace />;
  }

  return <Outlet />;
}
