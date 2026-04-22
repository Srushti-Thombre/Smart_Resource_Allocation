import { useState } from 'react';
import { HiOutlineClipboardCheck, HiOutlineClock, HiOutlineChat, HiOutlineUpload, HiOutlineCheckCircle } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const activeTasksData = [
  {
    id: 'task-1',
    title: 'English Teaching - Weekend Session',
    ngo: 'Hope Foundation',
    deadline: 'April 25, 2026',
    progress: 65,
    status: 'In Progress',
    category: 'Education'
  },
  {
    id: 'task-2',
    title: 'Food Pack Distribution',
    ngo: 'Sahara Relief Trust',
    deadline: 'April 28, 2026',
    progress: 20,
    status: 'On Hold',
    category: 'Disaster Relief'
  }
];

const completedTasksData = [
  {
    id: 'task-done-1',
    title: 'Community Garden Setup',
    ngo: 'Green Earth Initiative',
    completedDate: 'March 15, 2026',
    impact: 'Helped 50+ families',
    hours: 12
  }
];

export default function MyTasks() {
  const { user, applications, submitWork } = useAuth();
  const [activeModal, setActiveModal] = useState(null); // 'contact', 'submit'
  const [selectedTask, setSelectedTask] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  // Get tasks for this volunteer from global applications
  const myTasks = applications.filter(app => 
    (app.applicantId === user?.id || app.applicantName === user?.name) && 
    ['accepted', 'submitted', 'completed', 'pending', 'rejected'].includes(app.status)
  );
  const completedTasks = myTasks.filter(t => t.status === 'completed');

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending': return { label: 'Application Pending', color: 'text-amber-400', progress: 10 };
      case 'rejected': return { label: 'Application Rejected', color: 'text-red-400', progress: 0 };
      case 'submitted': return { label: 'Review Pending', color: 'text-amber-400', progress: 95 };
      case 'completed': return { label: 'Verified Done', color: 'text-emerald-400', progress: 100 };
      default: return { label: 'Work in Progress', color: 'text-blue-400', progress: 65 };
    }
  };

  const handleAction = (task, type) => {
    setSelectedTask(task);
    setUploadedFile(null);
    setActiveModal(type);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmitWork = () => {
    setIsProcessing(true);
    const previewUrl = uploadedFile ? URL.createObjectURL(uploadedFile) : null;
    
    setTimeout(() => {
      submitWork(selectedTask.id, uploadedFile?.name || 'proof.png', previewUrl);
      setIsProcessing(false);
      setActiveModal(null);
    }, 1500);
  };

  return (
    <div className="space-y-10 pb-20 relative">
      {/* Hidden File Input */}
      <input 
        type="file" 
        id="fileUpload" 
        className="hidden" 
        onChange={handleFileUpload}
      />

      {/* Contact NGO Modal */}
      {activeModal === 'contact' && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-[2.5rem] border border-white/10 bg-slate-900 p-8 shadow-2xl animate-bounce-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-amber-400/10 flex items-center justify-center text-amber-200">
                <HiOutlineChat className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Message {selectedTask.ngoName || 'NGO'}</h3>
                <p className="text-xs text-slate-400">Regarding: {selectedTask.requestTitle}</p>
              </div>
            </div>
            <textarea 
              placeholder="Type your message here..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none focus:border-amber-400/30 min-h-[120px]"
            />
            <div className="mt-6 flex gap-3">
              <button onClick={() => setActiveModal(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-xs font-bold text-white uppercase tracking-widest">Cancel</button>
              <button onClick={() => setActiveModal(null)} className="flex-1 py-3 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-widest">Send Message</button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Work Modal */}
      {activeModal === 'submit' && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-[2.5rem] border border-white/10 bg-slate-900 p-8 shadow-2xl animate-bounce-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400">
                <HiOutlineUpload className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Submit Completion</h3>
                <p className="text-xs text-slate-400">Project: {selectedTask.requestTitle}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div 
                onClick={() => document.getElementById('fileUpload').click()}
                className={`rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition flex flex-col items-center justify-center ${
                  uploadedFile ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/10 bg-white/5 hover:border-blue-400/30'
                }`}
              >
                {uploadedFile ? (
                  <>
                    <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                      <HiOutlineCheckCircle className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-white line-clamp-1">{uploadedFile.name}</p>
                    <p className="mt-1 text-[10px] text-emerald-400/60 uppercase tracking-widest">Ready to submit</p>
                  </>
                ) : (
                  <>
                    <HiOutlineUpload className="h-8 w-8 text-slate-500 mb-2" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Upload Proof (Photos/PDF)</p>
                  </>
                )}
              </div>
              <textarea 
                placeholder="Final remarks or impact summary..."
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white outline-none focus:border-blue-400/30"
              />
            </div>

            <div className="mt-8 flex gap-3">
              <button onClick={() => setActiveModal(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-xs font-bold text-white uppercase tracking-widest">Cancel</button>
              <button 
                onClick={handleSubmitWork}
                disabled={isProcessing}
                className="flex-1 py-3 rounded-xl bg-blue-500 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                {isProcessing ? <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Confirm Submission'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">My Assignments</h1>
        <p className="mt-2 text-slate-400">Track your active contributions and review completed milestones.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          label="Active Initiatives" 
          value={myTasks.filter(t => t.status === 'accepted').length} 
          icon={HiOutlineClock} 
          color="blue"
        />
        <StatsCard 
          label="Submission Pending" 
          value={myTasks.filter(t => t.status === 'submitted').length} 
          icon={HiOutlineChat} 
          color="amber"
        />
        <StatsCard 
          label="Success Rate" 
          value="98%" 
          icon={HiOutlineClipboardCheck} 
          color="green"
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
        {/* Main Task List */}
        <div className="space-y-8">
          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-3">
              Ongoing Tasks
              <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] text-blue-400 border border-blue-500/20">
                Priority
              </span>
            </h2>
            <div className="space-y-4">
              {myTasks.length > 0 ? (
                myTasks.map(task => {
                  const statusInfo = getStatusInfo(task.status);
                  return (
                    <div key={task.id} className="group rounded-[2.5rem] border border-white/10 bg-white/5 p-8 transition-all hover:border-blue-400/20 hover:bg-white/[0.07]">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Assignment</span>
                            <div className="h-1 w-1 rounded-full bg-slate-700" />
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white">{task.requestTitle}</h3>
                          <p className="text-sm text-amber-200/80 font-medium">{task.ngoName}</p>
                        </div>
                        
                        <div className="flex flex-col items-end gap-2">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</p>
                          <p className={`text-sm font-bold capitalize ${statusInfo.color}`}>{task.status}</p>
                        </div>
                      </div>

                      <div className="mt-8 space-y-3">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                          <span>Completion Progress</span>
                          <span className={statusInfo.color}>{statusInfo.progress}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${task.status === 'completed' ? 'bg-emerald-500' : task.status === 'rejected' ? 'bg-red-500' : 'bg-gradient-to-r from-blue-500 to-indigo-500'}`}
                            style={{ width: `${statusInfo.progress}%` }} 
                          />
                        </div>
                      </div>

                      <div className="mt-8 flex flex-wrap gap-4">
                        <button 
                          onClick={() => handleAction(task, 'contact')}
                          className="flex items-center gap-2 rounded-2xl bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white border border-white/10 hover:bg-white/10 transition"
                        >
                          <HiOutlineChat className="h-4 w-4" />
                          Contact NGO
                        </button>
                        <button 
                          disabled={task.status === 'submitted' || task.status === 'completed' || task.status === 'pending' || task.status === 'rejected'}
                          onClick={() => handleAction(task, 'submit')}
                          className={`flex items-center gap-2 rounded-2xl px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition ${
                            ['submitted', 'pending'].includes(task.status)
                            ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400 cursor-not-allowed' 
                            : task.status === 'completed'
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 cursor-not-allowed'
                            : task.status === 'rejected'
                            ? 'bg-red-500/10 border border-red-500/20 text-red-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 hover:-translate-y-0.5'
                          }`}
                        >
                          <HiOutlineUpload className="h-4 w-4" />
                          {task.status === 'submitted' ? 'Review Pending' : task.status === 'completed' ? 'Task Completed' : task.status === 'pending' ? 'Application Sent' : task.status === 'rejected' ? 'Application Rejected' : 'Submit Work'}
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-20 text-center rounded-[2.5rem] border border-dashed border-white/10 text-slate-500">
                  <HiOutlineClock className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>You haven't been assigned any tasks yet.</p>
                  <Link to="/feed" className="mt-4 inline-block text-amber-200 font-bold hover:underline">Browse Requests</Link>
                </div>
              )}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white">Completed Contributions</h2>
            <div className="space-y-4">
              {completedTasks.length > 0 || completedTasksData.length > 0 ? (
                [...completedTasks, ...completedTasksData].map((task, idx) => (
                  <div key={task.id || idx} className="flex items-center justify-between rounded-3xl border border-white/5 bg-slate-950/40 p-6">
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">{task.requestTitle || task.title}</h4>
                      <p className="text-xs text-slate-500">{task.ngoName || task.ngo} • {task.date || task.completedDate}</p>
                      <p className="text-xs text-emerald-400 font-medium mt-2">Impact: {task.impact || 'Verified Contribution'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">{task.hours || '8'}h</p>
                      <p className="text-[10px] uppercase text-slate-500">Duration</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500 italic">No completed tasks yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar: Performance & Recognition */}
        <div className="space-y-8">
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8">
            <h3 className="text-lg font-bold text-white mb-6">Engagement Score</h3>
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <svg className="h-32 w-32 -rotate-90">
                  <circle
                    className="text-white/5"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-amber-400"
                    strokeWidth="8"
                    strokeDasharray={364}
                    strokeDashoffset={364 - (364 * 85) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="58"
                    cx="64"
                    cy="64"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-white">85</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Points</span>
                </div>
              </div>
              <p className="mt-6 text-center text-xs text-slate-400 leading-relaxed">
                You're in the <span className="text-amber-200 font-bold">top 15%</span> of volunteers this month! Keep it up.
              </p>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-8 backdrop-blur-xl">
             <h3 className="text-lg font-bold text-white mb-4">Quick Tips</h3>
             <ul className="space-y-4">
               {[
                 'Always log your hours post-session.',
                 'Upload photos for better verification.',
                 'Connect with NGOs early for clarity.'
               ].map((tip, i) => (
                 <li key={i} className="flex gap-3 text-xs text-slate-400 leading-relaxed">
                   <span className="text-amber-200">✦</span>
                   {tip}
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
