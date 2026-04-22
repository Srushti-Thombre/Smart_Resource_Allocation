import { HiOutlineClipboardCheck, HiOutlineClock, HiOutlineChat, HiOutlineUpload } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';

export default function MyTasks() {
  const { user } = useAuth();

  const activeTasks = [
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

  const completedTasks = [
    {
      id: 'task-done-1',
      title: 'Community Garden Setup',
      ngo: 'Green Earth Initiative',
      completedDate: 'March 15, 2026',
      impact: 'Helped 50+ families',
      hours: 12
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">My Assignments</h1>
        <p className="mt-2 text-slate-400">Track your active contributions and review completed milestones.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          label="Active Initiatives" 
          value={activeTasks.length} 
          icon={HiOutlineClock} 
          color="blue"
        />
        <StatsCard 
          label="Submission Pending" 
          value="1" 
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
              {activeTasks.map(task => (
                <div key={task.id} className="group rounded-[2.5rem] border border-white/10 bg-white/5 p-8 transition-all hover:border-blue-400/20 hover:bg-white/[0.07]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{task.category}</span>
                        <div className="h-1 w-1 rounded-full bg-slate-700" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">{task.status}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">{task.title}</h3>
                      <p className="text-sm text-amber-200/80 font-medium">{task.ngo}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Deadline</p>
                      <p className="text-sm font-bold text-white">{task.deadline}</p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                      <span>Completion Progress</span>
                      <span className="text-blue-400">{task.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500" 
                        style={{ width: `${task.progress}%` }} 
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <button className="flex items-center gap-2 rounded-2xl bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white border border-white/10 hover:bg-white/10 transition">
                      <HiOutlineChat className="h-4 w-4" />
                      Contact NGO
                    </button>
                    <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 transition">
                      <HiOutlineUpload className="h-4 w-4" />
                      Submit Work
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-bold text-white">Completed Contributions</h2>
            <div className="space-y-4">
              {completedTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between rounded-3xl border border-white/5 bg-slate-950/40 p-6">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">{task.title}</h4>
                    <p className="text-xs text-slate-500">{task.ngo} • {task.completedDate}</p>
                    <p className="text-xs text-emerald-400 font-medium mt-2">Impact: {task.impact}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{task.hours}h</p>
                    <p className="text-[10px] uppercase text-slate-500">Duration</p>
                  </div>
                </div>
              ))}
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
