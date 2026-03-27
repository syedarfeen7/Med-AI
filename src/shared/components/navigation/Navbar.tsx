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
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import { ROUTES } from "@/app/routes/paths";
import { logoutUser } from "@/features/auth/services/authService";
import { getUserActivities } from "@/features/notifications/services/activityService";
import type {
  ActivityPagination,
  UserActivity,
} from "@/features/notifications/types/activity";
import { cn } from "@/shared/lib/utils";
import { useAuth } from "@/features/auth/context/AuthContext";

const NOTIFICATION_PAGE_SIZE = 10;

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [isLoadingNotifications, setIsLoadingNotifications] = React.useState(false);
  const [isLoadingMoreNotifications, setIsLoadingMoreNotifications] =
    React.useState(false);
  const [logoutError, setLogoutError] = React.useState("");
  const [notificationsError, setNotificationsError] = React.useState("");
  const [activities, setActivities] = React.useState<UserActivity[]>([]);
  const [notificationPagination, setNotificationPagination] =
    React.useState<ActivityPagination | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { accessToken, isAuthenticated, signOut, user } = useAuth();
  const notificationPanelRef = React.useRef<HTMLDivElement | null>(null);
  const notificationButtonRef = React.useRef<HTMLButtonElement | null>(null);

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

  const fetchNotifications = React.useCallback(async (page = 1) => {
    if (!accessToken) {
      setNotificationsError("Your session is missing an access token.");
      return;
    }

    if (page === 1) {
      setIsLoadingNotifications(true);
      setNotificationsError("");
    } else {
      setIsLoadingMoreNotifications(true);
    }

    try {
      const result = await getUserActivities(accessToken, {
        limit: NOTIFICATION_PAGE_SIZE,
        page,
      });

      setActivities((currentActivities) =>
        page === 1
          ? result.items
          : [...currentActivities, ...result.items],
      );
      setNotificationPagination(result.pagination);
    } catch (error) {
      setNotificationsError(
        error instanceof Error
          ? error.message
          : "Unable to load notifications right now.",
      );
    } finally {
      if (page === 1) {
        setIsLoadingNotifications(false);
      } else {
        setIsLoadingMoreNotifications(false);
      }
    }
  }, [accessToken]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setLogoutError("");

    try {
      await logoutUser();
      signOut();
      setIsOpen(false);
      setIsNotificationsOpen(false);
      setActivities([]);
      setNotificationPagination(null);
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

  const handleNotificationToggle = async () => {
    const nextState = !isNotificationsOpen;
    setIsNotificationsOpen(nextState);

    if (nextState) {
      await fetchNotifications();
    }
  };

  React.useEffect(() => {
    if (!isNotificationsOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        notificationPanelRef.current?.contains(target) ||
        notificationButtonRef.current?.contains(target)
      ) {
        return;
      }

      setIsNotificationsOpen(false);
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isNotificationsOpen]);

  React.useEffect(() => {
    setIsNotificationsOpen(false);
  }, [location.pathname]);

  const hasNotifications = activities.length > 0;
  const hasMoreNotifications = Boolean(
    notificationPagination &&
      notificationPagination.page < notificationPagination.totalPages,
  );

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
                <button
                  ref={notificationButtonRef}
                  onClick={handleNotificationToggle}
                  className={cn(
                    "p-2 transition-colors relative rounded-xl",
                    isNotificationsOpen
                      ? "text-brand-600 bg-brand-50"
                      : "text-slate-400 hover:text-brand-600",
                  )}
                  aria-label="Open notifications"
                  aria-expanded={isNotificationsOpen}
                >
                  <Bell className="w-5 h-5" />
                  {hasNotifications && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                  )}
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

      {isAuthenticated && isNotificationsOpen && (
        <div className="hidden md:block absolute right-6 top-[calc(100%+12px)] z-50">
          <div
            ref={notificationPanelRef}
            className="w-[26rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Notifications</h3>
                <p className="text-xs text-slate-500">
                  {notificationPagination?.total
                    ? `${notificationPagination.total} total updates for your account`
                    : "Recent updates related to your account"}
                </p>
              </div>
              <button
                onClick={() => fetchNotifications(1)}
                disabled={isLoadingNotifications}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:text-brand-600 disabled:text-slate-300"
              >
                <RefreshCw
                  className={cn("w-4 h-4", isLoadingNotifications && "animate-spin")}
                />
                Refresh
              </button>
            </div>

            <div className="max-h-[28rem] overflow-y-auto">
              {isLoadingNotifications ? (
                <div className="flex items-center justify-center gap-2 px-5 py-10 text-sm font-medium text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading notifications...
                </div>
              ) : notificationsError ? (
                <div className="px-5 py-6">
                  <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {notificationsError}
                  </div>
                </div>
              ) : activities.length === 0 ? (
                <div className="px-5 py-10 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <Bell className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-bold text-slate-900">No notifications yet</p>
                  <p className="mt-1 text-sm text-slate-500">
                    New account activity will appear here.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {activities.map((activity) => (
                    <div key={activity.id} className="px-5 py-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-500" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm font-bold text-slate-900">
                              {activity.title}
                            </p>
                            {activity.createdAt && (
                              <span className="shrink-0 text-[11px] font-medium text-slate-400">
                                {formatDistanceToNow(new Date(activity.createdAt), {
                                  addSuffix: true,
                                })}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-sm leading-relaxed text-slate-600">
                            {activity.message || "You have a new account update."}
                          </p>
                          {activity.type && (
                            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
                              {activity.type}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {hasMoreNotifications && (
                    <div className="px-5 py-4">
                      <button
                        onClick={() =>
                          fetchNotifications(
                            (notificationPagination?.page ?? 1) + 1,
                          )
                        }
                        disabled={isLoadingMoreNotifications}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:text-brand-600 disabled:text-slate-300"
                      >
                        {isLoadingMoreNotifications ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Loading more...
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-4 h-4" />
                            Load more
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
