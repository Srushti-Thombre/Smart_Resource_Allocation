import { useState } from 'react';
import { HiOutlineLocationMarker, HiOutlineClock, HiOutlineUserGroup, HiOutlineCash, HiOutlineMap, HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import MapDisplay from './MapDisplay';
import { mockNGOs } from '../data/mockData';

export default function RequestCard({ request, onAction }) {
  const [showMap, setShowMap] = useState(false);
  const isVolunteer = request.type === 'volunteer';
  const progress = !isVolunteer ? (request.fundingRaised / request.fundingGoal) * 100 : (request.volunteersJoined / request.volunteersNeeded) * 100;
  
  // Find the NGO address for this request
  const ngo = mockNGOs.find(n => n.id === request.ngoId);
  const address = ngo?.address || `${request.city}, India`;

  const urgencyColors = {
    low: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    medium: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
    high: 'bg-orange-400/10 text-orange-400 border-orange-400/20',
    critical: 'bg-red-400/10 text-red-400 border-red-400/20',
  };

  return (
    <div className="flex flex-col rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-amber-300/20 hover:bg-white/[0.07]">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-white/10">
          {request.category}
        </span>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${urgencyColors[request.urgency]}`}>
          {request.urgency}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-white line-clamp-1">{request.title}</h3>
      <p className="mt-1 text-sm font-medium text-amber-200/80">{request.ngoName}</p>
      
      <p className="mt-4 text-sm leading-6 text-slate-400 line-clamp-2">
        {request.description}
      </p>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <HiOutlineLocationMarker className="h-4 w-4 text-slate-500" />
            {request.city}
          </div>
          <button 
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-200/60 hover:text-amber-200 transition-colors"
          >
            <HiOutlineMap className="h-3 w-3" />
            {showMap ? 'Hide Map' : 'Show Map'}
            {showMap ? <HiOutlineChevronUp className="h-3 w-3" /> : <HiOutlineChevronDown className="h-3 w-3" />}
          </button>
        </div>

        {showMap && (
          <div className="animate-fade-in overflow-hidden rounded-2xl border border-white/5 bg-slate-950/20">
            <MapDisplay address={address} />
          </div>
        )}
        
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span>{isVolunteer ? 'Volunteers' : 'Funding'}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${isVolunteer ? 'from-purple-500 to-indigo-500' : 'from-amber-400 to-orange-500'}`} 
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-300">
            <span>{isVolunteer ? `${request.volunteersJoined} joined` : `₹${request.fundingRaised.toLocaleString()}`}</span>
            <span>{isVolunteer ? `${request.volunteersNeeded} needed` : `₹${request.fundingGoal.toLocaleString()}`}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onAction(request)}
        className={`mt-8 w-full rounded-2xl py-3 text-sm font-bold transition-all duration-300 ${
          isVolunteer 
            ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10' 
            : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 hover:shadow-lg hover:shadow-amber-500/20'
        }`}
      >
        {isVolunteer ? 'Apply to Help' : 'Donate Now'}
      </button>
    </div>
  );
}
