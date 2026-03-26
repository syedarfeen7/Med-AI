import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const ForgotPasswordPage: React.FC = () => {
  const [sent, setSent] = React.useState(false);

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
            {sent ? 'Check your email' : 'Forgot Password?'}
          </h1>
          <p className="text-slate-500">
            {sent 
              ? "We've sent a password reset link to your email address." 
              : "Enter your email and we'll send you a link to reset your password."}
          </p>
        </div>

        {!sent ? (
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="email" 
                  required
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-brand-400 focus:ring-4 focus:ring-brand-500/5 transition-all"
                />
              </div>
            </div>

            <button className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-600/20 active:scale-95 flex items-center justify-center gap-2">
              Send Reset Link
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <button 
              onClick={() => setSent(false)}
              className="w-full py-4 bg-slate-50 text-slate-700 rounded-2xl font-bold hover:bg-slate-100 transition-all"
            >
              Resend Email
            </button>
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-slate-50">
          <Link 
            to="/login" 
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
