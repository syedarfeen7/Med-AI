import React from 'react';
import { Star, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

import { getDoctorProfilePath } from '@/app/routes/paths';
import { type Doctor } from '@/features/doctors/types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const nextAvailable = doctor.availableSlots[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden card-shadow transition-all group"
    >
      <div className="p-5">
        <div className="flex gap-4">
          <div className="relative flex-shrink-0">
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 border-2 border-white w-4 h-4 rounded-full" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-bold text-slate-900 truncate group-hover:text-brand-600 transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-sm text-brand-600 font-medium">{doctor.specialty}</p>
              </div>
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="text-xs font-bold text-amber-700">{doctor.rating}</span>
              </div>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-500">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>{doctor.experience} yrs exp.</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span className="truncate">{doctor.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-slate-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-brand-50 rounded-lg">
                <Clock className="w-4 h-4 text-brand-600" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Next Available</p>
                <p className="text-xs font-semibold text-slate-700">
                  {nextAvailable ? `${nextAvailable.date} at ${nextAvailable.slots[0]}` : 'No slots soon'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Consultation</p>
              <p className="text-sm font-bold text-slate-900">${doctor.fee}</p>
            </div>
          </div>

          <Link 
            to={getDoctorProfilePath(doctor.id)}
            className="flex items-center justify-center gap-2 w-full py-3 bg-slate-50 hover:bg-brand-600 hover:text-white text-slate-700 font-bold rounded-xl transition-all group/btn"
          >
            View Profile
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
