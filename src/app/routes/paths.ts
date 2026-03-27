export const ROUTES = {
  home: '/',
  search: '/search',
  bookingConfirmation: '/booking-confirmation',
  login: '/login',
  signup: '/signup',
  accountVerification: '/account-verification',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset/password',
  userDashboard: '/dashboard',
  doctorDashboard: '/doctor-dashboard',
  doctorProfile: '/doctor/:id',
} as const;

export function getDoctorProfilePath(id: string) {
  return `/doctor/${id}`;
}
