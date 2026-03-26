import React from "react";
import { AISearchBar } from "../components/AISearchBar";
import { motion } from "motion/react";
import {
  Shield,
  Zap,
  Users,
  Star,
  ArrowRight,
  CheckCircle2,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-200/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-200/20 blur-[100px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 text-brand-700 text-sm font-bold mb-6 border border-brand-100">
                <Zap className="w-4 h-4 fill-brand-700" />
                AI-Powered Healthcare Booking
              </span>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
                Find the right doctor, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-blue-600">
                  instantly with AI.
                </span>
              </h1>
              <p className="text-xl text-slate-600 mb-12 leading-relaxed">
                Skip the endless scrolling. Just tell us what you need in plain
                English, and our AI will match you with the best specialists in
                seconds.
              </p>

              <AISearchBar className="max-w-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-brand-400/20 to-blue-400/20 blur-3xl rounded-full" />
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=800&h=1000"
                  alt="Doctor using AI tablet"
                  className="rounded-[3rem] shadow-2xl border-8 border-white object-cover aspect-[4/5]"
                  referrerPolicy="no-referrer"
                />

                {/* Floating UI Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -left-12 top-1/4 glass p-4 rounded-2xl shadow-xl border border-white/40 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Status
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      Appointment Booked
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -right-8 bottom-1/4 glass p-4 rounded-2xl shadow-xl border border-white/40 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-amber-600 fill-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
                      Rating
                    </p>
                    <p className="text-sm font-bold text-slate-900">
                      4.9/5 Average
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: "Trusted Doctors", value: "2,500+", icon: Users },
              { label: "Patient Reviews", value: "45k+", icon: Star },
              { label: "Secure Booking", value: "100%", icon: Shield },
              { label: "Specialties", value: "40+", icon: CheckCircle2 },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 mb-3">
                  <stat.icon className="w-6 h-6 text-brand-600" />
                </div>
                <span className="text-2xl font-black text-slate-900">
                  {stat.value}
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              How it works
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Booking a doctor has never been this simple. Just three steps to
              better health.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-brand-100 -translate-y-1/2 -z-10" />

            {[
              {
                step: "01",
                title: "Describe your need",
                desc: "Type your symptoms or the type of specialist you need in plain English.",
                img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=400",
              },
              {
                step: "02",
                title: "AI Matches You",
                desc: "Our AI analyzes thousands of profiles to find the perfect match for your specific case.",
                img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400&h=400",
              },
              {
                step: "03",
                title: "Instant Booking",
                desc: "Choose a time slot that works for you and get instant confirmation.",
                img: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=400&h=400",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="w-48 h-48 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-600 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed max-w-[250px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Why choose MedAI?
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto">
              Experience a smarter way to manage your health with our
              cutting-edge AI platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Natural Language Search",
                desc: 'No more complex filters. Just type "I need a dentist for tomorrow morning" and we handle the rest.',
                icon: Zap,
                color: "bg-amber-50 text-amber-600",
              },
              {
                title: "Verified Specialists",
                desc: "Every doctor on our platform undergoes a rigorous verification process for your peace of mind.",
                icon: Shield,
                color: "bg-green-50 text-green-600",
              },
              {
                title: "Instant Confirmation",
                desc: "Book your slot in two clicks and get instant confirmation via SMS and Email.",
                icon: CheckCircle2,
                color: "bg-brand-50 text-brand-600",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl border border-slate-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/5 transition-all group"
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                    feature.color,
                  )}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-brand-600 rounded-[3rem] p-12 md:p-20 overflow-hidden text-center text-white">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent)]" />

            <h2 className="text-4xl md:text-5xl font-black mb-6 relative z-10">
              Ready to book your next <br /> appointment?
            </h2>
            <p className="text-brand-100 text-lg mb-10 max-w-xl mx-auto relative z-10">
              Join thousands of patients who have simplified their healthcare
              journey with MedAI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                to="/signup"
                className="bg-white text-brand-600 px-10 py-4 rounded-2xl font-black text-lg hover:bg-brand-50 transition-all shadow-xl shadow-black/10"
              >
                Get Started Free
              </Link>
              <Link
                to="/search"
                className="bg-brand-500 text-white border border-brand-400 px-10 py-4 rounded-2xl font-black text-lg hover:bg-brand-400 transition-all"
              >
                Find a Doctor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="bg-brand-600 p-2 rounded-xl">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">
                  MedAI
                </span>
              </Link>
              <p className="max-w-sm leading-relaxed">
                Making healthcare accessible, smart, and fast through the power
                of artificial intelligence. Your health, our priority.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/search"
                    className="hover:text-brand-400 transition-colors"
                  >
                    Find Doctors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-brand-400 transition-colors"
                  >
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="hover:text-brand-400 transition-colors"
                  >
                    Join as Doctor
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Support</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-brand-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 MedAI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
