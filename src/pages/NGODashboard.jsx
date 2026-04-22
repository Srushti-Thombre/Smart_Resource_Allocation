import { HiOutlineUserGroup, HiOutlineCash, HiOutlineClipboardList, HiOutlinePlus } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';
import { mockRequests } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function NGODashboard() {
  const { user } = useAuth();
  
  // My active requests
  const myRequests = mockRequests.filter(r => r.ngoId === user?.id);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
          <p className="mt-2 text-slate-400">Manage your initiatives and resource requests.</p>
        </div>
        <Link 
          to="/create-request"
          className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:shadow-lg hover:shadow-amber-500/20"
        >
          <HiOutlinePlus className="h-5 w-5" />
          Create Request
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          label="Volunteers Engaged" 
          value={user?.volunteersEngaged || 0} 
          icon={HiOutlineUserGroup} 
          trend="+12 this week"
          color="purple"
        />
        <StatsCard 
          label="Total Funds Raised" 
          value={`₹${(user?.fundsRaised || 0).toLocaleString()}`} 
          icon={HiOutlineCash} 
          trend="+₹45,000"
          color="green"
        />
        <StatsCard 
          label="Active Requests" 
          value={user?.activeRequests || 0} 
          icon={HiOutlineClipboardList} 
          color="blue"
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Active Requests</h2>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Progress</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {myRequests.map((req) => {
                  const progress = req.type === 'volunteer' 
                    ? (req.volunteersJoined / req.volunteersNeeded) * 100 
                    : (req.fundingRaised / req.fundingGoal) * 100;
                  
                  return (
                    <tr key={req.id} className="transition hover:bg-white/[0.02]">
                      <td className="px-6 py-5 font-bold text-white">{req.title}</td>
                      <td className="px-6 py-5">
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border ${
                          req.type === 'volunteer' ? 'text-purple-400 border-purple-400/20' : 'text-amber-400 border-amber-400/20'
                        }`}>
                          {req.type}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-24 rounded-full bg-white/5 overflow-hidden">
                            <div className="h-full bg-amber-400" style={{ width: `${progress}%` }} />
                          </div>
                          <span className="text-xs font-bold text-slate-400">{Math.round(progress)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px] uppercase tracking-widest">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Active
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Recent Applications</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/[0.07]">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">Applicant {i}</p>
                  <p className="text-xs text-slate-500">Applied for: English Teaching</p>
                </div>
                <button className="rounded-xl bg-amber-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-200 hover:bg-amber-400/20">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
