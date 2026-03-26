import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AISearchBar } from '../components/AISearchBar';
import { DoctorCard } from '../components/DoctorCard';
import { processAISearch } from '../services/aiSearchService';
import { type Doctor } from '../data/mockData';
import { Filter, SlidersHorizontal, Search, Loader2, Calendar, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      const doctors = await processAISearch(query);
      setResults(doctors);
      setLoading(false);
    };
    fetchResults();
  }, [query]);

  const sortedResults = [...results].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'fee-low') return a.fee - b.fee;
    if (sortBy === 'experience') return b.experience - a.experience;
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-slate-200 pt-8 pb-6 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AISearchBar initialValue={query} className="max-w-4xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0 hidden lg:block">
            <div className="sticky top-64 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </h4>
                  <button className="text-xs font-bold text-brand-600 hover:underline">Reset</button>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Specialty</p>
                    {['Dermatologist', 'General Physician', 'Pediatrician', 'Cardiologist', 'Dentist'].map(s => (
                      <label key={s} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{s}</span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Availability</p>
                    {['Today', 'Tomorrow', 'This Weekend'].map(a => (
                      <label key={a} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
                        <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{a}</span>
                      </label>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400">Price Range</p>
                    <input type="range" className="w-full accent-brand-600" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>$50</span>
                      <span>$500</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-brand-600 rounded-2xl text-white">
                <h5 className="font-bold mb-2">Need help?</h5>
                <p className="text-xs text-brand-100 mb-4 leading-relaxed">Our AI can help you find the perfect match. Just describe your symptoms.</p>
                <button className="w-full py-2 bg-white text-brand-600 rounded-xl text-xs font-bold hover:bg-brand-50 transition-colors">
                  Chat with AI
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  {loading ? 'Searching...' : `${results.length} Doctors found`}
                </h2>
                {!loading && query && (
                  <p className="text-slate-500 text-sm mt-1">
                    Showing results for <span className="font-bold text-slate-700">"{query}"</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500 font-medium whitespace-nowrap">Sort by:</span>
                <div className="relative">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-2 pr-10 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 cursor-pointer"
                  >
                    <option value="rating">Highest Rated</option>
                    <option value="fee-low">Price: Low to High</option>
                    <option value="experience">Most Experienced</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-brand-600 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Search className="w-4 h-4 text-brand-400" />
                  </div>
                </div>
                <p className="mt-4 text-slate-500 font-medium animate-pulse">Our AI is analyzing your request...</p>
              </div>
            ) : sortedResults.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {sortedResults.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl p-12 text-center border border-slate-100 card-shadow"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-8">
                  We couldn't find any doctors matching your request. Try using different keywords or a broader description.
                </p>
                <button 
                  onClick={() => window.history.back()}
                  className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-700 transition-all"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
