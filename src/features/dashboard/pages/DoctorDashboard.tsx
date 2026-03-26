import React from 'react';
import { 
  User, Calendar, Clock, DollarSign, Star, 
  Settings, LogOut, Bell, ChevronRight, Edit3, 
  Camera, Award, BookOpen, Globe
} from 'lucide-react';
import { motion } from 'motion/react';

import { cn } from '@/shared/lib/utils';

export const DoctorDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Welcome, Dr. Mitchell!</h1>
            <p className="text-slate-500">You have 4 appointments scheduled for today.</p>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              <Settings className="w-5 h-5" />
              Settings
            </button>
            <button className="flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all">
              <Edit3 className="w-5 h-5" />
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Profile Completion */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 card-shadow text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=200&h=200" 
                  alt="Doctor" 
                  className="w-full h-full rounded-[2.5rem] object-cover border-4 border-brand-50"
                  referrerPolicy="no-referrer"
                />
                <button className="absolute -bottom-2 -right-2 p-2 bg-brand-600 text-white rounded-xl shadow-lg border-2 border-white">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-xl font-black text-slate-900">Dr. Sarah Mitchell</h3>
              <p className="text-sm text-brand-600 font-bold mb-6">Dermatologist</p>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-400">Profile Completion</span>
                  <span className="text-brand-600">85%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-[85%] h-full bg-brand-600 rounded-full" />
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">Complete your education and certification details to get more visibility.</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow">
              <h4 className="font-bold text-slate-900 mb-6">Quick Actions</h4>
              <nav className="space-y-2">
                {[
                  { name: 'Manage Schedule', icon: Calendar },
                  { name: 'Patient Records', icon: User },
                  { name: 'Consultation Fees', icon: DollarSign },
                  { name: 'Reviews & Ratings', icon: Star },
                ].map(item => (
                  <button
                    key={item.name}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column: Main Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Today', value: '4', icon: Calendar, color: 'text-brand-600', bg: 'bg-brand-50' },
                { label: 'Patients', value: '1.2k', icon: User, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Rating', value: '4.9', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Earnings', value: '$2.4k', icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 card-shadow">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bg)}>
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-xl font-black text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900">Today's Appointments</h3>
                <button className="text-sm font-bold text-brand-600 hover:underline">Full Schedule</button>
              </div>
              <div className="divide-y divide-slate-50">
                {[
                  { name: 'Alice Johnson', time: '09:00 AM', type: 'Consultation', status: 'Confirmed' },
                  { name: 'Robert Smith', time: '10:30 AM', type: 'Follow-up', status: 'Pending' },
                  { name: 'Emma Wilson', time: '02:00 PM', type: 'Skin Check', status: 'Confirmed' },
                ].map((apt, i) => (
                  <div key={i} className="p-6 hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400">
                          {apt.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{apt.name}</p>
                          <p className="text-xs text-slate-500">{apt.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-700">{apt.time}</p>
                        <span className={cn(
                          "text-[10px] font-black uppercase tracking-widest",
                          apt.status === 'Confirmed' ? "text-green-600" : "text-amber-600"
                        )}>
                          {apt.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-100 card-shadow">
                <h5 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-brand-600" />
                  Certifications
                </h5>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl text-xs font-medium text-slate-600">Board Certified Dermatologist</div>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs font-medium text-slate-600">Cosmetic Surgery Specialist</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-slate-100 card-shadow">
                <h5 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-brand-600" />
                  Publications
                </h5>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-xl text-xs font-medium text-slate-600">Modern Acne Treatments (2025)</div>
                  <div className="p-3 bg-slate-50 rounded-xl text-xs font-medium text-slate-600">Skin Cancer Prevention (2024)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
