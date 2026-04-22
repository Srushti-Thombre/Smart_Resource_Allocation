import { useState } from 'react';
import { HiOutlineLocationMarker, HiOutlineMap, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineCheckCircle, HiOutlineHeart, HiOutlineLightningBolt } from 'react-icons/hi';
import MapDisplay from './MapDisplay';
import { mockNGOs } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export default function RequestCard({ request, onAction }) {
  const { user, organizations, applyForRequest, notify } = useAuth();
  const [showMap, setShowMap] = useState(false);
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const isVolunteer = request.type === 'volunteer';
  const goal = isVolunteer ? (request.volunteersNeeded || 1) : (request.fundingGoal || 1);
  const current = isVolunteer ? (request.volunteersJoined || 0) : (request.fundingRaised || 0);
  const progress = (current / goal) * 100;
  
  // Find the NGO address for this request from global state
  const ngo = organizations.find(n => n.id === request.ngoId);
  const address = ngo?.address || `${request.city}, India`;

  const urgencyColors = {
    low: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    medium: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
    high: 'bg-orange-400/10 text-orange-400 border-orange-400/20',
    critical: 'bg-red-400/10 text-red-400 border-red-400/20',
  };

  const handleAction = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      if (isVolunteer) {
        applyForRequest(request);
        notify('Application Sent!', `You've successfully applied to "${request.title}"`, 'success');
      } else {
        notify('Donation Successful!', `Thank you for supporting "${request.title}"`, 'success');
      }
      if (onAction) onAction(request);
    }, 1200);
  };

  // AI Matching Logic (Simulation)
  const isMatch = isVolunteer && user?.skills?.some(skill => 
    request.description.toLowerCase().includes(skill.toLowerCase()) || 
    request.title.toLowerCase().includes(skill.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-amber-300/20 hover:bg-white/[0.07] relative overflow-hidden group">
      {/* AI Match Badge */}
      {/* AI Match Badge */}
      {isMatch && (
        <div className="absolute -top-1 -right-1 z-20">
          <div className="bg-gradient-to-br from-emerald-400 to-teal-600 px-4 py-1.5 rounded-bl-3xl rounded-tr-[1.5rem] text-[9px] font-bold text-slate-950 uppercase tracking-widest flex items-center gap-1.5 shadow-lg animate-fade-in">
            <HiOutlineLightningBolt className="h-3 w-3" />
            AI Perfect Match
          </div>
        </div>
      )}

      {status === 'success' && (
        <div className="absolute inset-0 z-10 bg-slate-950/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6 animate-fade-in">
          <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 animate-bounce-in border border-emerald-500/30 shadow-glow shadow-emerald-500/20">
            {isVolunteer ? <HiOutlineCheckCircle className="h-8 w-8" /> : <HiOutlineHeart className="h-8 w-8" />}
          </div>
          <h4 className="text-lg font-bold text-white">{isVolunteer ? 'Application Sent!' : 'Donation Received!'}</h4>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">Thank you for making an impact. The NGO will be notified immediately.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-6 text-[10px] font-bold uppercase tracking-widest text-amber-200 hover:text-white"
          >
            Back to Card
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="rounded-full bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border border-white/10">
          {request.category}
        </span>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${urgencyColors[request.urgency]}`}>
          {request.urgency}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-bold text-white">{request.title}</h3>
      <p className="mt-1 text-sm font-medium text-amber-200/80">{request.ngoName}</p>
      
      <p className="mt-4 text-sm leading-6 text-slate-400">
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
        onClick={handleAction}
        disabled={status === 'loading'}
        className={`mt-auto w-full rounded-2xl py-3 text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
          status === 'loading' ? 'bg-slate-800 text-slate-500 cursor-not-allowed' :
          isVolunteer 
            ? 'bg-white/5 text-white hover:bg-white/10 border border-white/10' 
            : 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 hover:shadow-lg hover:shadow-amber-500/20'
        }`}
      >
        {status === 'loading' ? (
          <>
            <div className="h-4 w-4 border-2 border-slate-600 border-t-slate-400 rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          isVolunteer ? 'Apply to Help' : 'Donate Now'
        )}
      </button>
    </div>
  );
}
