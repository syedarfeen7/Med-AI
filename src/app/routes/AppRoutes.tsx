import { Route, Routes } from "react-router-dom";

import { ProtectedRoute } from "@/app/routes/ProtectedRoute";
import { PublicOnlyRoute } from "@/app/routes/PublicOnlyRoute";
import { ROUTES } from "@/app/routes/paths";
import {
  AccountVerificationPage,
  LoginPage,
  SignupPage,
  ForgotPasswordPage,
  ResetPasswordPage,
} from "@/features/auth/pages";
import { BookingConfirmationPage } from "@/features/bookings/pages/BookingConfirmationPage";
import { DoctorDashboard, UserDashboard } from "@/features/dashboard/pages";
import {
  DoctorProfilePage,
  LandingPage,
  SearchResultsPage,
} from "@/features/doctors/pages";

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.home} element={<LandingPage />} />
      <Route path={ROUTES.search} element={<SearchResultsPage />} />
      <Route path={ROUTES.doctorProfile} element={<DoctorProfilePage />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route path={ROUTES.signup} element={<SignupPage />} />
        <Route path={ROUTES.forgotPassword} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.resetPassword} element={<ResetPasswordPage />} />
        <Route
          path={ROUTES.accountVerification}
          element={<AccountVerificationPage />}
        />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["patient"]} />}>
        <Route
          path={ROUTES.bookingConfirmation}
          element={<BookingConfirmationPage />}
        />
        <Route path={ROUTES.userDashboard} element={<UserDashboard />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["doctor"]} />}>
        <Route path={ROUTES.doctorDashboard} element={<DoctorDashboard />} />
      </Route>
    </Routes>
  );
}
