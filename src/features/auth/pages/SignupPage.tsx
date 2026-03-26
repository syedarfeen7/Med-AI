import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Heart,
  ArrowRight,
  User,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import { motion } from "motion/react";

import { ROUTES } from "@/app/routes/paths";
import { registerUser } from "@/features/auth/services/authService";
import { cn } from "@/shared/lib/utils";

type SignupFormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
};

const INITIAL_FORM_STATE: SignupFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  acceptedTerms: false,
};

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = React.useState<"patient" | "doctor">("patient");
  const [form, setForm] = React.useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleChange =
    (field: keyof SignupFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "acceptedTerms" ? event.target.checked : event.target.value;

      setForm((currentForm) => ({
        ...currentForm,
        [field]: value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!form.acceptedTerms) {
      setError("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await registerUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
        role,
      });

      setSuccessMessage(
        response.message ??
          "Account created successfully. Redirecting to sign in...",
      );
      setForm(INITIAL_FORM_STATE);

      window.setTimeout(() => {
        navigate(ROUTES.login);
      }, 1200);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to create your account right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log(">>> base",import.meta.env.VITE_API_BASE_URL);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column: Image */}
      <div className="hidden lg:block relative flex-1">
        <img
          src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Modern medical facility"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent" />
        <div className="absolute bottom-20 left-20 right-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-lg"
          >
            <div className="w-12 h-1 bg-brand-500 mb-8" />
            <h2 className="text-5xl font-black mb-6 leading-[1.1] tracking-tight">
              Better healthcare <br />
              <span className="italic font-serif text-brand-200 font-normal">
                is just a click away.
              </span>
            </h2>
            <p className="text-brand-100/80 text-lg leading-relaxed font-medium">
              "MedAI is not just a booking platform. It's your personal health
              companion, powered by intelligence."
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 20}`}
                    className="w-10 h-10 rounded-full border-2 border-brand-900 object-cover"
                    alt="User"
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-brand-100">
                Join our growing community
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex-1 flex items-center justify-center py-20 px-4 sm:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-lg w-full"
        >
          <div className="mb-10">
            <Link
              to={ROUTES.home}
              className="inline-flex items-center gap-2 mb-8 group"
            >
              <div className="bg-brand-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                MedAI
              </span>
            </Link>
            <h1 className="text-4xl font-black text-slate-900 mb-2">
              Join MedAI
            </h1>
            <p className="text-slate-500">
              Start your journey to better health today
            </p>
          </div>

          <div className="flex p-1.5 bg-slate-100 rounded-2xl mb-10">
            <button
              onClick={() => setRole("patient")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                role === "patient"
                  ? "bg-white text-brand-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              <User className="w-4 h-4" />
              I'm a Patient
            </button>
            <button
              onClick={() => setRole("doctor")}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all",
                role === "doctor"
                  ? "bg-white text-brand-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              <ShieldCheck className="w-4 h-4" />
              I'm a Doctor
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/5 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/5 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  required
                  disabled={isSubmitting}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/5 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange("password")}
                  required
                  disabled={isSubmitting}
                  minLength={8}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/5 transition-all"
                />
              </div>
              <p className="text-[10px] text-slate-400 ml-1">
                Must be at least 8 characters with a number
              </p>
            </div>

            <div className="flex items-start gap-3 ml-1">
              <input
                type="checkbox"
                checked={form.acceptedTerms}
                onChange={handleChange("acceptedTerms")}
                disabled={isSubmitting}
                className="mt-1 w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <p className="text-xs text-slate-500 leading-relaxed">
                I agree to the{" "}
                <a
                  href="#"
                  className="text-brand-600 font-bold hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-brand-600 font-bold hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>

            {(error || successMessage) && (
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm font-medium",
                  error
                    ? "bg-red-50 text-red-600 border border-red-100"
                    : "bg-green-50 text-green-700 border border-green-100",
                )}
              >
                {error || successMessage}
              </div>
            )}

            <button
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-600/20 active:scale-95 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to={ROUTES.login}
              className="text-brand-600 font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
