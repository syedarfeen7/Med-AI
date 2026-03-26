import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Heart, ArrowRight, Github, Chrome } from "lucide-react";
import { motion } from "motion/react";

import { ROUTES } from "@/app/routes/paths";

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column: Form */}
      <div className="flex-1 flex items-center justify-center py-20 px-4 sm:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-md w-full"
        >
          <div className="mb-10">
            <Link to={ROUTES.home} className="inline-flex items-center gap-2 mb-8 group">
              <div className="bg-brand-600 p-2 rounded-xl group-hover:rotate-12 transition-transform">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                MedAI
              </span>
            </Link>
            <h1 className="text-4xl font-black text-slate-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-500">
              Sign in to manage your health journey
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/5 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                <Link
                  to={ROUTES.forgotPassword}
                  title="Forgot Password"
                  className="text-xs font-bold text-brand-600 hover:underline"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/5 transition-all"
                />
              </div>
            </div>

            <button className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-600/20 active:scale-95 flex items-center justify-center gap-2">
              Sign In
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-slate-400">
              <span className="bg-white px-4">Or continue with</span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700">
              <Chrome className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700">
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to={ROUTES.signup}
              className="text-brand-600 font-bold hover:underline"
            >
              Create one
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Column: Image */}
      <div className="hidden lg:block relative flex-1">
        <img
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200&h=1600"
          alt="Modern healthcare"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent" />
        <div className="absolute bottom-70 left-20 right-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-lg"
          >
            <div className="w-12 h-1 bg-brand-500 mb-8" />
            <h2 className="text-5xl font-black mb-6 leading-[1.1] tracking-tight">
              Your health journey <br />
              <span className="italic font-serif text-brand-200 font-normal">
                starts here.
              </span>
            </h2>
            <p className="text-brand-100/80 text-lg leading-relaxed font-medium">
              "The greatest wealth is health. MedAI makes it easier than
              ever to prioritize yours."
            </p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    className="w-10 h-10 rounded-full border-2 border-brand-900 object-cover"
                    alt="User"
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-brand-100">
                Joined by 45k+ patients
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
