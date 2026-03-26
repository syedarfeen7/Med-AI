import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  MailCheck,
  MailWarning,
  Heart,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { motion } from "motion/react";

import { ROUTES } from "@/app/routes/paths";
import { verifyEmail } from "@/features/auth/services/authService";
import { cn } from "@/shared/lib/utils";

function maskEmail(email: string) {
  const [localPart = "", domain = ""] = email.split("@");

  if (!localPart || !domain) {
    return email;
  }

  if (localPart.length <= 2) {
    return `${localPart[0] ?? ""}***@${domain}`;
  }

  return `${localPart.slice(0, 2)}***@${domain}`;
}

export const AccountVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? searchParams.get("code") ?? "";
  const isReturningFromEmail = Boolean(token);
  const [status, setStatus] = React.useState<
    "instructions" | "loading" | "success" | "error" | "missing-token"
  >(isReturningFromEmail ? "loading" : "instructions");
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    if (!isReturningFromEmail) {
      setStatus("instructions");
      return;
    }

    if (!token) {
      setStatus("missing-token");
      setMessage("Verification token is missing from the email link.");
      return;
    }

    let isMounted = true;

    const runVerification = async () => {
      setStatus("loading");
      setMessage("We’re verifying your account now.");

      try {
        const response = await verifyEmail({ token });

        if (!isMounted) {
          return;
        }

        setStatus("success");
        setMessage(
          response.message ??
            "Your email has been verified successfully. You can sign in now.",
        );

        window.setTimeout(() => {
          navigate(ROUTES.login);
        }, 1800);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setStatus("error");
        setMessage(
          error instanceof Error
            ? error.message
            : "This verification link is invalid or expired.",
        );
      }
    };

    void runVerification();

    return () => {
      isMounted = false;
    };
  }, [isReturningFromEmail, navigate, token]);

  const statusConfig = {
    instructions: {
      icon: Mail,
      iconWrapperClassName: "bg-white/15",
      cardIcon: ShieldCheck,
      cardIconClassName: "text-green-600",
      cardIconWrapperClassName: "bg-green-50",
      title: "Check Your Email",
      subtitle:
        "We’ve sent an account verification link to your inbox. Open the email and continue from there to activate your MedAI account.",
      cardTitle: "Verification Email Sent",
      cardMessage: email
        ? `We sent the link to ${maskEmail(email)}.`
        : "We sent the link to the email address you used during signup.",
    },
    loading: {
      icon: Loader2,
      iconWrapperClassName: "bg-white/15",
      cardIcon: Loader2,
      cardIconClassName: "text-brand-600 animate-spin",
      cardIconWrapperClassName: "bg-brand-50",
      title: "Verifying Your Account",
      subtitle:
        "Please wait a moment while we verify your email verification link.",
      cardTitle: "Verification In Progress",
      cardMessage: message || "We’re verifying your account now.",
    },
    success: {
      icon: CheckCircle2,
      iconWrapperClassName: "bg-white/15",
      cardIcon: MailCheck,
      cardIconClassName: "text-green-600",
      cardIconWrapperClassName: "bg-green-50",
      title: "Account Verified",
      subtitle:
        "Your verification link worked and your MedAI account is now active.",
      cardTitle: "Verification Complete",
      cardMessage: message,
    },
    error: {
      icon: MailWarning,
      iconWrapperClassName: "bg-white/15",
      cardIcon: MailWarning,
      cardIconClassName: "text-amber-600",
      cardIconWrapperClassName: "bg-amber-50",
      title: "Verification Failed",
      subtitle:
        "We couldn’t verify this link. It may be invalid, expired, or already used.",
      cardTitle: "Link Needs Attention",
      cardMessage: message,
    },
    "missing-token": {
      icon: MailWarning,
      iconWrapperClassName: "bg-white/15",
      cardIcon: MailWarning,
      cardIconClassName: "text-red-600",
      cardIconWrapperClassName: "bg-red-50",
      title: "Invalid Verification Link",
      subtitle:
        "This verification link is incomplete. Please use the full link from the email.",
      cardTitle: "Token Missing",
      cardMessage: message,
    },
  } as const;

  const currentStatus = statusConfig[status];
  const HeaderIcon = currentStatus.icon;
  const CardIcon = currentStatus.cardIcon;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white shadow-xl"
      >
        <div className="bg-gradient-to-r from-brand-600 to-blue-600 px-8 py-10 text-white md:px-12">
          <Link to={ROUTES.home} className="inline-flex items-center gap-2 group">
            <div className="rounded-xl bg-white/15 p-2 transition-transform group-hover:rotate-12">
              <Heart className="h-5 w-5 fill-white text-white" />
            </div>
            <span className="text-xl font-black tracking-tight">MedAI</span>
          </Link>

          <div className="mt-8 flex items-start gap-4">
            <div className={cn("rounded-2xl p-4", currentStatus.iconWrapperClassName)}>
              <HeaderIcon
                className={cn("h-8 w-8", status === "loading" && "animate-spin")}
              />
            </div>
            <div>
              <h1 className="text-3xl font-black">{currentStatus.title}</h1>
              <p className="mt-3 max-w-xl text-sm text-brand-50">{currentStatus.subtitle}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-10 md:px-12">
          <div className="rounded-3xl bg-slate-50 p-6">
            <div className="flex items-start gap-4">
              <div className={cn("rounded-2xl p-3", currentStatus.cardIconWrapperClassName)}>
                <CardIcon className={cn("h-6 w-6", currentStatus.cardIconClassName)} />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900">{currentStatus.cardTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{currentStatus.cardMessage}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-4 text-sm text-slate-600">
            {status === "instructions" && (
              <>
                <p>What to do next:</p>
                <p>1. Open your inbox and look for a MedAI verification email.</p>
                <p>2. Click the verification link in that email.</p>
                <p>3. Land back on this screen and complete your onboarding flow.</p>
              </>
            )}
            {status === "loading" && (
              <>
                <p>What’s happening now:</p>
                <p>1. We received your verification token from the email link.</p>
                <p>2. We are checking it with the backend.</p>
                <p>3. If it is valid, we will redirect you to sign in.</p>
              </>
            )}
            {(status === "error" || status === "missing-token") && (
              <>
                <p>Try this next:</p>
                <p>1. Open the latest verification email you received.</p>
                <p>2. Click the full verification link again.</p>
                <p>3. If the issue continues, request a fresh verification email.</p>
              </>
            )}
            {status === "success" && (
              <>
                <p>You’re all set:</p>
                <p>1. Your email is verified.</p>
                <p>2. We’ll send you to sign in shortly.</p>
                <p>3. You can also continue manually right now.</p>
              </>
            )}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Link
              to={ROUTES.login}
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 font-black text-white transition-all hover:bg-brand-700"
            >
              Continue to Sign In
              <ArrowRight className="h-5 w-5" />
            </Link>

            <Link
              to={ROUTES.signup}
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-6 py-4 font-bold text-slate-700 transition-all hover:bg-slate-200"
            >
              {status === "instructions" ? "Back to Signup" : "Start Again"}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
