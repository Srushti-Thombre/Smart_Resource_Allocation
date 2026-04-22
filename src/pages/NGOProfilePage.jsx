import { useParams } from 'react-router-dom';
import { mockNGOs, mockRequests } from '../data/mockData';
import RequestCard from '../components/RequestCard';
import { HiOutlineGlobeAlt, HiOutlineMail, HiOutlineCalendar, HiOutlineBadgeCheck } from 'react-icons/hi';
import MapDisplay from '../components/MapDisplay';

export default function NGOProfilePage() {
  const { id } = useParams();
  const ngo = mockNGOs.find(n => n.id === id) || mockNGOs[0];
  const ngoRequests = mockRequests.filter(r => r.ngoId === ngo.id);

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Header */}
      <div className="relative h-80 overflow-hidden rounded-[3rem] border border-white/10 bg-slate-900 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-[#05122f] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-40" />
        
        <div className="absolute bottom-8 left-10 right-10 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#8b5cf6] to-[#f59e0b] text-3xl font-bold text-white shadow-glow border-4 border-slate-950">
              {ngo.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-4xl font-bold text-white">{ngo.name}</h1>
                {ngo.verified && <HiOutlineBadgeCheck className="h-6 w-6 text-amber-400" />}
              </div>
              <p className="mt-2 text-lg font-medium text-amber-200/80">{ngo.category} • {ngo.city}</p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="rounded-2xl bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-md hover:bg-white/20 transition border border-white/10">
              Contact
            </button>
            <button className="rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-3 text-sm font-bold text-slate-950 hover:shadow-lg hover:shadow-amber-500/20 transition">
              Donate Support
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        {/* Left Column: Info */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-lg leading-9 text-slate-300">
              {ngo.mission}
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8">Active Initiatives</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {ngoRequests.map(req => (
                <RequestCard key={req.id} request={req} onAction={() => {}} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Impact History</h2>
            <div className="grid gap-4">
              {ngo.pastWork.map((work, i) => (
                <div key={i} className="flex gap-4 rounded-3xl border border-white/5 bg-white/5 p-6 transition hover:bg-white/[0.08]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 text-amber-400 text-lg">
                    ✨
                  </div>
                  <p className="text-slate-300 leading-7">{work}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-8">
          <MapDisplay address={ngo.address} />
          
          <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-8 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-6">Organization Details</h3>
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-slate-400">
                <HiOutlineGlobeAlt className="h-5 w-5 text-slate-500" />
                <span className="text-sm">www.{ngo.name.toLowerCase().replace(' ', '')}.org</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <HiOutlineMail className="h-5 w-5 text-slate-500" />
                <span className="text-sm">{ngo.email}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <HiOutlineCalendar className="h-5 w-5 text-slate-500" />
                <span className="text-sm">Founded in {ngo.founded}</span>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xl font-bold text-white">{ngo.volunteersEngaged}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Volunteers</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">₹{(ngo.fundsRaised / 100000).toFixed(1)}L</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Raised</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8">
            <h3 className="text-lg font-bold text-white mb-4">Core Team</h3>
            <div className="space-y-4">
              {ngo.team.map((member, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-slate-800 border border-white/10" />
                  <div>
                    <p className="text-sm font-bold text-white">{member.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
