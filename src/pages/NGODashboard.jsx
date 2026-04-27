import { useState } from 'react';
import { HiOutlineUserGroup, HiOutlineCash, HiOutlineClipboardList, HiOutlinePlus, HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import MapDisplay from '../components/MapDisplay';
import HeatmapDisplay from '../components/HeatmapDisplay';

export default function NGODashboard() {
  const { user, requests, applications, updateApplicationStatus } = useAuth();
  const [selectedApp, setSelectedApp] = useState(null);
  
  // My active requests
  const myRequests = requests.filter(r => r.ngoId === user?.id);

  // My applications
  const myApplications = applications.filter(app => app.ngoId === user?.id);

  const handleReview = (app, status) => {
    updateApplicationStatus(app.id, status);
    setSelectedApp(null);
  };

  return (
    <div className="space-y-10 relative">
      {/* Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-[2.5rem] border border-white/10 bg-slate-900 p-8 shadow-2xl animate-bounce-in">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-glow">
                {selectedApp.applicantAvatar || selectedApp.applicantName[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedApp.applicantName}</h3>
                <p className="text-sm text-slate-400">Applying for: <span className="text-amber-200">{selectedApp.requestTitle}</span></p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-white/5 p-4 border border-white/5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Message from Volunteer</p>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "I have a background in this field and would love to contribute my time to help the community through this initiative."
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => handleReview(selectedApp, 'rejected')}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 py-4 text-sm font-bold text-red-400 hover:bg-red-500/10 transition"
                >
                  <HiOutlineX className="h-5 w-5" />
                  Decline
                </button>
                <button 
                  onClick={() => handleReview(selectedApp, 'accepted')}
                  className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 text-sm font-bold text-slate-950 hover:shadow-lg hover:shadow-emerald-500/20 transition"
                >
                  <HiOutlineCheck className="h-5 w-5" />
                  Approve
                </button>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="w-full text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition"
              >
                Decide Later
              </button>
            </div>
          </div>
        </div>
      )}
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
          value={(user?.volunteersEngaged || 0) + myApplications.filter(a => a.status === 'accepted').length} 
          icon={HiOutlineUserGroup} 
          trend={`+${myApplications.filter(a => a.status === 'pending').length} pending`}
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
          value={myRequests.length} 
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
                            <div className="h-full bg-amber-400" style={{ width: `${Math.min(progress || 0, 100)}%` }} />
                          </div>
                          <span className="text-xs font-bold text-slate-400">{Math.round(progress || 0)}%</span>
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

        <div className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Regional Demand Analysis</h2>
            <HeatmapDisplay />
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Recent Applications</h2>
            <div className="space-y-4">
              {myApplications.filter(a => a.status === 'pending').length > 0 ? (
                myApplications.filter(a => a.status === 'pending').map((app) => (
                  <div key={app.id} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/[0.07]">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold text-white">
                      {app.applicantAvatar || app.applicantName[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">{app.applicantName}</p>
                      <p className="text-[11px] text-slate-500">Applied for: {app.requestTitle}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedApp(app)}
                      className="rounded-xl bg-amber-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-200 hover:bg-amber-400/20 transition"
                    >
                      Review
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center rounded-3xl border border-dashed border-white/5 text-slate-500 text-sm">
                  {myApplications.length > 0 ? 'All applications reviewed!' : 'No new applications yet.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
