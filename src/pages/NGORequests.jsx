import { HiOutlinePlus, HiOutlineFilter, HiOutlineDotsVertical } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

export default function NGORequests() {
  const navigate = useNavigate();
  const requests = [
    { id: 1, title: 'Teaching Volunteers Needed in Dharavi', type: 'Volunteer', progress: 60, status: 'Active', count: '9/15' },
    { id: 2, title: 'Scholarship Fund for 100 Students', type: 'Funding', progress: 67, status: 'Active', count: '₹3.3L/5L' },
    { id: 3, title: 'Flood Relief Nashik - Logistics', type: 'Volunteer', progress: 40, status: 'Active', count: '12/30' },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Resource Requests</h1>
          <p className="mt-2 text-slate-400">Track and manage your active volunteer needs and funding campaigns.</p>
        </div>
        <button 
          onClick={() => navigate('/create-request')}
          className="flex items-center gap-2 rounded-2xl bg-amber-400 px-6 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-amber-400/20 hover:-translate-y-1 transition"
        >
          <HiOutlinePlus className="h-5 w-5" />
          New Request
        </button>
      </div>

      <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-1 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <th className="px-8 py-6">Request Details</th>
                <th className="px-8 py-6">Type</th>
                <th className="px-8 py-6">Progress</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {requests.map((req) => (
                <tr key={req.id} className="group hover:bg-white/[0.02] transition">
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white">{req.title}</p>
                      <p className="text-xs text-slate-500">Created 2 days ago</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                      req.type === 'Volunteer' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {req.type}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="w-48 space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>{req.count}</span>
                        <span>{req.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-white/5">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-600" 
                          style={{ width: `${req.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      {req.status}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="rounded-xl p-2 text-slate-500 hover:bg-white/5 hover:text-white transition">
                      <HiOutlineDotsVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
