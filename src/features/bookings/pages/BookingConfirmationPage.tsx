import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, MapPin, User, ArrowRight, Home } from 'lucide-react';
import { motion } from 'motion/react';

import { ROUTES } from '@/app/routes/paths';
import { DOCTORS } from '@/features/doctors/data/doctors';

export const BookingConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get('doctorId');
  const date = searchParams.get('date');
  const slot = searchParams.get('slot');
  
  const doctor = DOCTORS.find(d => d.id === doctorId);

  if (!doctor) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 card-shadow text-center"
      >
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-black text-slate-900 mb-2">Booking Confirmed!</h1>
        <p className="text-slate-500 mb-10">Your appointment has been successfully scheduled. A confirmation has been sent to your email.</p>

        <div className="bg-slate-50 rounded-3xl p-6 mb-10 text-left space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
            <img src={doctor.image} alt={doctor.name} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
            <div>
              <p className="font-bold text-slate-900">{doctor.name}</p>
              <p className="text-xs text-brand-600 font-bold">{doctor.specialty}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Calendar className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</p>
                <p className="text-sm font-bold text-slate-700">{date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</p>
                <p className="text-sm font-bold text-slate-700">{slot}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <MapPin className="w-4 h-4 text-slate-400" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
              <p className="text-sm font-bold text-slate-700">{doctor.hospital}, {doctor.location}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            to={ROUTES.userDashboard}
            className="flex items-center justify-center gap-2 py-4 bg-brand-600 text-white rounded-2xl font-black transition-all hover:bg-brand-700 shadow-lg shadow-brand-600/20"
          >
            View Bookings
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link 
            to={ROUTES.home}
            className="flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black transition-all hover:bg-slate-200"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
