import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HiOutlineUserGroup, HiCheckCircle, HiOutlineXCircle, HiOutlineExternalLink, HiOutlineClock } from 'react-icons/hi';

export default function NGOVolunteers() {
  const { user, applications, verifyWork } = useAuth();
  const [selectedProof, setSelectedProof] = useState(null);

  // Get all volunteers/applications for this NGO that are NOT pending or rejected
  const myVolunteers = applications.filter(app => 
    app.ngoId === user?.id && ['accepted', 'submitted', 'completed'].includes(app.status)
  );

  const getStatusStyle = (status) => {
    switch(status) {
      case 'completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'submitted': return 'text-amber-400 bg-amber-500/10 border-amber-500/20 animate-pulse';
      case 'accepted': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-slate-500 bg-white/5 border-white/10';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'completed': return 'Verified Done';
      case 'submitted': return 'Review Pending';
      case 'accepted': return 'Work in Progress';
      default: return status;
    }
  };

  return (
    <div className="space-y-10">
      {/* Proof Preview Modal */}
      {selectedProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-[2.5rem] border border-white/10 bg-slate-900 p-8 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Proof of Work Submission</h3>
            <div className="aspect-video rounded-2xl bg-white/5 border border-white/10 overflow-hidden flex flex-col items-center justify-center p-0 text-center group">
               {selectedProof.proofPreview ? (
                 <img 
                   src={selectedProof.proofPreview} 
                   alt="Proof of Work" 
                   className="h-full w-full object-cover animate-fade-in"
                 />
               ) : (
                 <div className="p-10">
                    <HiOutlineExternalLink className="h-12 w-12 text-slate-500 mb-4 mx-auto" />
                    <p className="text-sm font-bold text-white mb-2">{selectedProof.proofFile}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest italic">Simulation: File content preview would appear here</p>
                 </div>
               )}
            </div>
            <div className="mt-8 flex gap-4">
              <button 
                onClick={() => { verifyWork(selectedProof.id, 'reject'); setSelectedProof(null); }}
                className="flex-1 py-4 rounded-2xl border border-red-500/20 bg-red-500/5 text-xs font-bold text-red-400 uppercase tracking-widest hover:bg-red-500/10 transition"
              >
                Request Re-submission
              </button>
              <button 
                onClick={() => { verifyWork(selectedProof.id, 'approve'); setSelectedProof(null); }}
                className="flex-1 py-4 rounded-2xl bg-emerald-500 text-slate-950 text-xs font-bold uppercase tracking-widest hover:shadow-lg transition"
              >
                Approve & Complete
              </button>
            </div>
            <button onClick={() => setSelectedProof(null)} className="w-full mt-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Close Preview</button>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Volunteer Management</h1>
        <p className="mt-2 text-slate-400">Track progress, verify submissions, and manage your workforce.</p>
      </div>

      <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-slate-500">
            <tr>
              <th className="px-8 py-6">Volunteer</th>
              <th className="px-8 py-6">Assigned Task</th>
              <th className="px-8 py-6">Current Status</th>
              <th className="px-8 py-6">Submission / Proof</th>
              <th className="px-8 py-6 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {myVolunteers.length > 0 ? (
              myVolunteers.map((app) => (
                <tr key={app.id} className="transition hover:bg-white/[0.02] group">
                  <td className="px-8 py-7">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-glow">
                        {app.applicantAvatar || app.applicantName[0]}
                      </div>
                      <span className="font-bold text-white">{app.applicantName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-7">
                    <p className="font-medium text-slate-300">{app.requestTitle}</p>
                  </td>
                  <td className="px-8 py-7">
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${getStatusStyle(app.status)}`}>
                      {getStatusLabel(app.status)}
                    </span>
                  </td>
                  <td className="px-8 py-7">
                    {app.proofFile ? (
                      <button 
                        onClick={() => setSelectedProof(app)}
                        className="flex items-center gap-2 text-xs font-bold text-amber-200 underline decoration-amber-200/30 underline-offset-4 hover:text-white transition"
                      >
                        <HiOutlineExternalLink className="h-4 w-4" />
                        View Proof
                      </button>
                    ) : (
                      <span className="flex items-center gap-2 text-xs text-slate-600 italic">
                        <HiOutlineClock className="h-4 w-4" />
                        Not yet submitted
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-7 text-right">
                    {app.status === 'submitted' ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => verifyWork(app.id, 'reject')}
                          className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                          title="Reject"
                        >
                          <HiOutlineXCircle className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => verifyWork(app.id, 'approve')}
                          className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition"
                          title="Approve"
                        >
                          <HiCheckCircle className="h-5 w-5" />
                        </button>
                      </div>
                    ) : app.status === 'completed' ? (
                      <span className="text-emerald-400 font-bold text-[10px] uppercase tracking-widest flex items-center justify-end gap-1">
                        <HiCheckCircle className="h-4 w-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">Awaiting Work</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-500">
                    <HiOutlineUserGroup className="h-12 w-12 mb-4 opacity-20" />
                    <p className="text-lg font-medium">No approved volunteers yet.</p>
                    <p className="text-sm">Head to your dashboard to review new applications.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
