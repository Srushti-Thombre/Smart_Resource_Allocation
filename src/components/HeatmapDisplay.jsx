import { useState } from 'react';
import { HiOutlineFire, HiOutlineLocationMarker, HiOutlineArrowSmRight } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function HeatmapDisplay() {
  const { requests } = useAuth();
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Refined mapping of cities to mock coordinates for India map
  const cityCoords = {
    'Mumbai': { top: '65%', left: '25%' },
    'Pune': { top: '68%', left: '28%' },
    'Nashik': { top: '60%', left: '28%' },
    'Delhi': { top: '25%', left: '42%' },
    'Bangalore': { top: '82%', left: '35%' },
    'Thane': { top: '63%', left: '26%' },
    'Kolkata': { top: '50%', left: '85%' },
    'Hyderabad': { top: '70%', left: '45%' },
  };

  // Group requests by city for intensity calculation
  const cityStats = requests.reduce((acc, req) => {
    if (!acc[req.city]) {
      acc[req.city] = { count: 0, urgency: 'low', requests: [] };
    }
    acc[req.city].count += 1;
    acc[req.city].requests.push(req);
    if (req.urgency === 'critical') acc[req.city].urgency = 'critical';
    else if (req.urgency === 'high' && acc[req.city].urgency !== 'critical') acc[req.city].urgency = 'high';
    return acc;
  }, {});

  const heatmapPoints = Object.keys(cityStats).map(city => ({
    city,
    ...cityCoords[city],
    ...cityStats[city]
  })).filter(p => p.top && p.left);

  return (
    <div className="rounded-[3rem] border border-white/10 bg-slate-950/40 p-8 backdrop-blur-2xl overflow-hidden group relative">
      {/* Header with Stats Integrated */}
      <div className="flex items-start justify-between mb-8">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white uppercase tracking-[0.4em] flex items-center gap-2">
            <HiOutlineFire className="text-red-500 animate-pulse" />
            Impact Command Center
          </h3>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black">AI-Powered Demand Heatmap</p>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Global Reach</span>
            <span className="text-xl font-black text-white">{requests.length} <span className="text-[10px] text-red-500/80">Needs</span></span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col items-end">
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
                <span className="text-[9px] font-bold text-slate-400 uppercase">Critical</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                <span className="text-[9px] font-bold text-slate-400 uppercase">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden border border-white/5 bg-[#0a0a0f] shadow-2xl">
        {/* Stylized Dark Map */}
        <div className="absolute inset-0 opacity-50 mix-blend-screen">
          <iframe
            title="Heatmap Base"
            width="100%"
            height="100%"
            frameBorder="0"
            src="https://maps.google.com/maps?q=India&t=&z=5&ie=UTF8&iwloc=&output=embed"
            style={{ filter: 'grayscale(1) invert(0.9) contrast(1.2) brightness(0.6)' }}
          ></iframe>
        </div>

        {/* Multi-layered Heat Clusters */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {heatmapPoints.map((point, index) => {
            const intensityColor = point.urgency === 'critical' ? 'from-red-500' : 'from-amber-500';
            const size = point.count > 2 ? 'h-40 w-40' : 'h-24 w-24';
            return (
              <div key={index} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: point.top, left: point.left }}>
                {/* Core Heat */}
                <div className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[35px] opacity-30 animate-pulse bg-gradient-to-br ${intensityColor} to-transparent ${size}`} />
                {/* Outer Glow */}
                <div className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] opacity-10 bg-gradient-to-br ${intensityColor} to-transparent h-64 w-64`} />
              </div>
            );
          })}
        </div>

        {/* Interactive Points */}
        <div className="absolute inset-0 z-20">
          {heatmapPoints.map((point, index) => (
            <div 
              key={index}
              className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group/point cursor-pointer`}
              style={{ top: point.top, left: point.left }}
              onClick={() => setSelectedPoint(point)}
            >
              <div className="absolute inset-[-30px] rounded-full z-0 group-hover/point:bg-white/[0.03] transition-colors" />
              
              {/* Animated Ring */}
              <div className={`absolute h-8 w-8 rounded-full border border-white/20 animate-ping duration-[3s] ${selectedPoint?.city === point.city ? 'opacity-100' : 'opacity-0'}`} />
              
              {/* Point Core */}
              <div className={`h-4 w-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)] border-[3px] border-slate-950 transition-all group-hover/point:scale-125 z-30 ${selectedPoint?.city === point.city ? 'scale-125 ring-[6px] ring-white/10' : ''}`} />
              
              {/* Mini Label */}
              <div className={`mt-3 bg-slate-950/90 backdrop-blur-xl border border-white/10 rounded-xl px-3 py-1.5 shadow-2xl transition-all duration-300 pointer-events-none group-hover/point:opacity-100 group-hover/point:translate-y-0 ${selectedPoint?.city === point.city ? 'opacity-100 translate-y-0 border-amber-400/30' : 'opacity-0 translate-y-2'}`}>
                <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{point.city}</p>
                <p className="text-[8px] text-slate-500 font-bold uppercase mt-1">{point.count} Requests</p>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Floating Detail Card */}
        {selectedPoint && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-80 rounded-[2.5rem] border border-white/10 bg-slate-950/80 p-6 backdrop-blur-3xl shadow-2xl animate-bounce-in">
            <div className="flex items-center justify-between mb-5">
               <div className="flex items-center gap-3">
                 <div className="h-10 w-10 rounded-2xl bg-amber-400/10 flex items-center justify-center text-amber-400">
                    <HiOutlineLocationMarker className="h-6 w-6" />
                 </div>
                 <div>
                   <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">{selectedPoint.city}</h4>
                   <p className="text-[10px] font-bold text-slate-500 uppercase">Demand Intensity: <span className={selectedPoint.urgency === 'critical' ? 'text-red-400' : 'text-amber-400'}>{selectedPoint.urgency}</span></p>
                 </div>
               </div>
               <button onClick={(e) => { e.stopPropagation(); setSelectedPoint(null); }} className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 hover:text-white transition hover:bg-white/10">
                 <HiOutlineFire className="h-4 w-4 rotate-180" />
               </button>
            </div>
            
            <div className="space-y-3">
              {selectedPoint.requests.map(req => (
                <div key={req.id} className="group/item rounded-2xl bg-white/[0.03] p-4 border border-white/5 transition hover:bg-white/[0.08] hover:border-white/10">
                  <p className="text-[11px] font-bold text-slate-200 line-clamp-1">{req.title}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{req.category}</span>
                    <button 
                      onClick={() => navigate('/feed')}
                      className="flex items-center gap-1 text-[10px] font-black text-amber-400 hover:text-amber-300 transition uppercase tracking-[0.1em]"
                    >
                      Action <HiOutlineArrowSmRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Scanning Effect - Subtle */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent animate-scan z-40" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 6s linear infinite;
        }
        .animate-bounce-in {
          animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        @keyframes bounceIn {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </div>
  );
}
