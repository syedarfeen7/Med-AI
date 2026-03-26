import React, { useState } from 'react';
import { Search, Sparkles, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface AISearchBarProps {
  className?: string;
  initialValue?: string;
  autoFocus?: boolean;
}

const EXAMPLES = [
  "I need a skin specialist this Friday",
  "Book a general physician for tomorrow morning",
  "Find the best female dentist near me",
  "I have a persistent cough and need a checkup"
];

export const AISearchBar: React.FC<AISearchBarProps> = ({ className, initialValue = '', autoFocus = false }) => {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto", className)}>
      <form 
        onSubmit={handleSearch}
        className="relative group"
      >
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Sparkles className="w-5 h-5 text-brand-500 animate-pulse" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your medical need in plain English..."
          autoFocus={autoFocus}
          className="w-full pl-14 pr-16 py-5 bg-white rounded-2xl border-2 border-brand-100 focus:border-brand-400 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all text-lg shadow-xl shadow-brand-500/5 group-hover:shadow-brand-500/10"
        />
        <div className="absolute inset-y-0 right-3 flex items-center gap-2">
          {query && (
            <button 
              type="button"
              onClick={() => setQuery('')}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            type="submit"
            className="bg-brand-600 hover:bg-brand-700 text-white p-3 rounded-xl transition-all shadow-lg shadow-brand-600/20 active:scale-95"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </form>
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-slate-500 py-1">Try:</span>
        {EXAMPLES.map((example, idx) => (
          <button
            key={idx}
            onClick={() => {
              setQuery(example);
              navigate(`/search?q=${encodeURIComponent(example)}`);
            }}
            className="text-xs bg-white border border-slate-200 hover:border-brand-300 hover:text-brand-600 px-3 py-1.5 rounded-full transition-all text-slate-600 shadow-sm"
          >
            "{example}"
          </button>
        ))}
      </div>
    </div>
  );
};
