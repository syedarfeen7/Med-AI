import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Heart, Loader2, Lock } from "lucide-react";
import { motion } from "motion/react";

import { ROUTES } from "@/app/routes/paths";
import { resetPassword } from "@/features/auth/services/authService";
import { cn } from "@/shared/lib/utils";

type ResetPasswordFormState = {
  password: string;
  confirmPassword: string;
};

const INITIAL_FORM_STATE: ResetPasswordFormState = {
  password: "",
  confirmPassword: "",
};

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [form, setForm] = React.useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleChange =
    (field: keyof ResetPasswordFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((currentForm) => ({
        ...currentForm,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!token) {
      setError("Reset token is missing from the link.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await resetPassword(token, {
        password: form.password,
        confirmPassword: form.confirmPassword,
      });

      setSuccessMessage(
        response.message ?? "Password reset successful. Redirecting to sign in...",
      );
      setForm(INITIAL_FORM_STATE);

      window.setTimeout(() => {
        navigate(ROUTES.login);
      }, 1200);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to reset password right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 card-shadow"
      >
        <div className="text-center mb-10">
          <div className="bg-brand-600 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand-600/20">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            Reset Password
          </h1>
          <p className="text-slate-500">
            Choose a new password for your account.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                required
                disabled={isSubmitting}
                minLength={8}
                placeholder="Enter new password"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/5 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                required
                disabled={isSubmitting}
                minLength={8}
                placeholder="Confirm new password"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/5 transition-all"
              />
            </div>
          </div>

          {(error || successMessage) && (
            <div
              className={cn(
                "rounded-2xl px-4 py-3 text-sm font-medium",
                error
                  ? "border border-red-100 bg-red-50 text-red-600"
                  : "border border-green-100 bg-green-50 text-green-700",
              )}
            >
              {error || successMessage}
            </div>
          )}

          <button
            disabled={isSubmitting || !token}
            className="w-full py-4 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-600/20 active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Resetting...
              </>
            ) : (
              <>
                Reset Password
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-50">
          <Link
            to={ROUTES.login}
            className="flex items-center justify-center gap-2 text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
