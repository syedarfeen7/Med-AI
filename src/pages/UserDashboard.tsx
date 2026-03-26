import React from 'react';
import { USER_BOOKINGS } from '../data/mockData';
import { 
  Calendar, Clock, MapPin, User, ChevronRight, 
  Settings, LogOut, Bell, Search, Filter, Plus
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export const UserDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Hello, John!</h1>
            <p className="text-slate-500">You have 1 upcoming appointment this week.</p>
          </div>
          <div className="flex gap-4">
            <Link 
              to="/search"
              className="flex items-center gap-2 bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              New Appointment
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 card-shadow">
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" 
                  alt="User" 
                  className="w-12 h-12 rounded-xl object-cover"
                />
                <div>
                  <p className="font-bold text-slate-900">John Doe</p>
                  <p className="text-xs text-slate-500">Premium Member</p>
                </div>
              </div>

              <nav className="space-y-1">
                {[
                  { name: 'Dashboard', icon: User, active: true },
                  { name: 'My Bookings', icon: Calendar },
                  { name: 'Notifications', icon: Bell },
                  { name: 'Settings', icon: Settings },
                ].map(item => (
                  <button
                    key={item.name}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                      item.active ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all mt-4">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Total Bookings', value: '12', color: 'text-brand-600', bg: 'bg-brand-50' },
                { label: 'Upcoming', value: '1', color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Health Score', value: '94', color: 'text-green-600', bg: 'bg-green-50' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 card-shadow">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className={cn("text-3xl font-black", stat.color)}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Bookings List */}
            <div className="bg-white rounded-3xl border border-slate-100 card-shadow overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-900">Recent Bookings</h3>
                <button className="text-sm font-bold text-brand-600 hover:underline">View All</button>
              </div>
              <div className="divide-y divide-slate-50">
                {USER_BOOKINGS.map((booking) => (
                  <div key={booking.id} className="p-6 hover:bg-slate-50 transition-colors group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-slate-400" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{booking.doctorName}</p>
                          <p className="text-xs text-brand-600 font-bold">{booking.doctorSpecialty}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:flex md:items-center gap-8">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-600">{booking.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-bold text-slate-600">{booking.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          booking.status === 'upcoming' ? "bg-amber-50 text-amber-600" : "bg-green-50 text-green-600"
                        )}>
                          {booking.status}
                        </span>
                        <button className="p-2 bg-slate-100 rounded-xl text-slate-400 group-hover:bg-brand-600 group-hover:text-white transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
