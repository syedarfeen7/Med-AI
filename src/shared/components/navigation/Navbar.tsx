import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  Calendar,
  Search,
  Menu,
  X,
  Bell,
  Loader2,
  LogOut,
} from "lucide-react";

import { ROUTES } from "@/app/routes/paths";
import { logoutUser } from "@/features/auth/services/authService";
import { cn } from "@/shared/lib/utils";
import { useAuth } from "@/features/auth/context/AuthContext";

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [logoutError, setLogoutError] = React.useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, signOut, user } = useAuth();

  const navLinks = [
    { name: "Find Doctors", path: ROUTES.search, icon: Search },
    ...(isAuthenticated
      ? [
          {
            name: "Dashboard",
            path:
              user?.role === "doctor"
                ? ROUTES.doctorDashboard
                : ROUTES.userDashboard,
            icon: Calendar,
          },
        ]
      : []),
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logoutUser();
      signOut();
      setIsOpen(false);
      navigate(ROUTES.login);
    } catch (error) {
      setLogoutError(
        error instanceof Error
          ? error.message
          : "Unable to log out right now. Please try again.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {logoutError && (
          <div className="pt-3">
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {logoutError}
            </div>
          </div>
        )}
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to={ROUTES.home} className="flex items-center gap-2 group">
              <div className="bg-brand-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900">
                Med<span className="text-brand-600">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-2 text-sm font-semibold transition-colors",
                  location.pathname === link.path
                    ? "text-brand-600"
                    : "text-slate-600 hover:text-brand-600",
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}

            <div className="h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-4">
              {isAuthenticated && (
                <button className="p-2 text-slate-400 hover:text-brand-600 transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                </button>
              )}
              {!isAuthenticated ? (
                <>
                  <Link
                    to={ROUTES.login}
                    className="text-sm font-bold text-slate-700 hover:text-brand-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to={ROUTES.signup}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-brand-600/20 active:scale-95"
                  >
                    Join Now
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-brand-600 disabled:text-slate-400 transition-colors"
                >
                  {isLoggingOut ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4" />
                  )}
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-200">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-4 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
            {!isAuthenticated ? (
              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to={ROUTES.login}
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 text-center font-bold text-slate-700 bg-slate-50 rounded-xl"
                >
                  Sign In
                </Link>
                <Link
                  to={ROUTES.signup}
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 text-center font-bold text-white bg-brand-600 rounded-xl"
                >
                  Join Now
                </Link>
              </div>
            ) : (
              <div className="pt-4">
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full py-4 inline-flex items-center justify-center gap-2 font-bold text-white bg-slate-900 rounded-xl disabled:bg-slate-400"
                >
                  {isLoggingOut && <Loader2 className="w-4 h-4 animate-spin" />}
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
