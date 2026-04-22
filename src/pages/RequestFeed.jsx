import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { mockRequests, categories } from '../data/mockData';
import RequestCard from '../components/RequestCard';
import { HiOutlineLightningBolt } from 'react-icons/hi';

export default function RequestFeed() {
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const { searchTerm, setSearchTerm } = useOutletContext();

  const filteredRequests = mockRequests.filter(req => {
    const matchesType = filterType === 'all' || req.type === filterType;
    const matchesCategory = filterCategory === 'all' || req.category === filterCategory;
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         req.ngoName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20">
      {/* Dynamic Header */}
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-[0.3em]">
            <HiOutlineLightningBolt className="h-4 w-4" />
            Discover Impact
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Available Opportunities</h1>
          <p className="text-slate-400 max-w-xl">Find nearby social initiatives that match your skills or contribute funds to verified NGO projects.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3 border-b border-white/5 pb-8">
        {['all', 'volunteer', 'funding'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
              filterType === type 
                ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20' 
                : 'bg-white/5 text-slate-400 border border-white/5 hover:bg-white/10 hover:text-white'
            }`}
          >
            {type === 'all' ? 'Everything' : type}
          </button>
        ))}
        
        <div className="h-8 w-px bg-white/10 mx-2" />

        <select 
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="rounded-full bg-white/5 border border-white/5 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-400 outline-none hover:text-white focus:border-amber-400/30 transition"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Requests Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-start">
        {filteredRequests.map(req => (
          <RequestCard key={req.id} request={req} onAction={() => {}} />
        ))}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02]">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/5 text-4xl text-slate-700 mb-8 animate-pulse">
            🔭
          </div>
          <h3 className="text-2xl font-bold text-white">No results found</h3>
          <p className="mt-3 text-slate-500 max-w-sm">We couldn't find any opportunities matching your current filters. Try broadening your search!</p>
          <button 
            onClick={() => {setFilterType('all'); setFilterCategory('all'); setSearchTerm('');}}
            className="mt-8 text-sm font-bold text-amber-200 underline underline-offset-8 decoration-amber-400/30 hover:text-amber-100"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
