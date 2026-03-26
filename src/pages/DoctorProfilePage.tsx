import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DOCTORS } from '../data/mockData';
import { 
  Star, MapPin, Clock, ShieldCheck, Award, Languages, 
  Calendar, ChevronRight, ArrowLeft, Heart, Share2, Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const DoctorProfilePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = DOCTORS.find(d => d.id === id);
  
  const [selectedDate, setSelectedDate] = useState(doctor?.availableSlots[0]?.date || '');
  const [selectedSlot, setSelectedSlot] = useState('');

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Doctor not found</h2>
          <button onClick={() => navigate('/search')} className="text-brand-600 font-bold">Back to Search</button>
        </div>
      </div>
    );
  }

  const currentSlots = doctor.availableSlots.find(s => s.date === selectedDate)?.slots || [];

  const handleBook = () => {
    if (selectedDate && selectedSlot) {
      navigate(`/booking-confirmation?doctorId=${doctor.id}&date=${selectedDate}&slot=${selectedSlot}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Results
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 card-shadow">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="relative flex-shrink-0">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-40 h-40 rounded-3xl object-cover border-4 border-brand-50"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white w-8 h-8 rounded-full" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-black text-slate-900">{doctor.name}</h1>
                        <div className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-xs font-bold border border-brand-100">
                          Verified
                        </div>
                      </div>
                      <p className="text-lg text-brand-600 font-bold mb-4">{doctor.specialty}</p>
                      
                      <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-amber-50 rounded-xl">
                            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{doctor.rating}</p>
                            <p className="text-xs text-slate-500">{doctor.reviewsCount} Reviews</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-brand-50 rounded-xl">
                            <ShieldCheck className="w-5 h-5 text-brand-600" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{doctor.experience} Years</p>
                            <p className="text-xs text-slate-500">Experience</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-slate-50 rounded-xl">
                            <MapPin className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">{doctor.location}</p>
                            <p className="text-xs text-slate-500">{doctor.hospital}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors text-slate-600">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors text-slate-600">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-100 card-shadow">
              <h3 className="text-xl font-black text-slate-900 mb-4">About Doctor</h3>
              <p className="text-slate-600 leading-relaxed mb-8">
                {doctor.about} Dr. {doctor.name.split(' ')[1]} is committed to providing patient-centered care with the latest medical advancements.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-brand-600" />
                    Education
                  </h4>
                  <ul className="space-y-3">
                    {doctor.education.map((edu, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Languages className="w-5 h-5 text-brand-600" />
                    Languages
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {doctor.languages.map(lang => (
                      <span key={lang} className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-100 card-shadow sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900">Book Appointment</h3>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fee</p>
                  <p className="text-2xl font-black text-brand-600">${doctor.fee}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-600" />
                    Select Date
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {doctor.availableSlots.map(slot => (
                      <button
                        key={slot.date}
                        onClick={() => {
                          setSelectedDate(slot.date);
                          setSelectedSlot('');
                        }}
                        className={cn(
                          "flex-shrink-0 w-24 py-3 rounded-2xl border-2 transition-all flex flex-col items-center",
                          selectedDate === slot.date 
                            ? "bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-600/20" 
                            : "bg-white border-slate-100 text-slate-600 hover:border-brand-200"
                        )}
                      >
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-70">
                          {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-lg font-black">
                          {new Date(slot.date).getDate()}
                        </span>
                        <span className="text-[10px] font-bold">
                          {new Date(slot.date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-600" />
                    Available Slots
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {currentSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={cn(
                          "py-3 rounded-xl border-2 text-sm font-bold transition-all",
                          selectedSlot === slot
                            ? "bg-brand-50 border-brand-600 text-brand-700"
                            : "bg-white border-slate-100 text-slate-600 hover:border-brand-200"
                        )}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    disabled={!selectedDate || !selectedSlot}
                    onClick={handleBook}
                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-600/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    Book Now
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
                    <Info className="w-3 h-3" />
                    No payment required upfront
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
