import { HiOutlineUserGroup, HiOutlineClock, HiOutlineLibrary, HiOutlinePlusCircle, HiOutlineSparkles } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import RequestCard from '../components/RequestCard';
import { useAuth } from '../context/AuthContext';
import { mockRequests } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function VolunteerDashboard() {
  const { user } = useAuth();
  
  // Filter nearby/recommended requests based on user skills
  const recommendedRequests = mockRequests
    .filter(r => r.type === 'volunteer')
    .sort((a, b) => {
      const aMatches = a.skillsNeeded?.some(s => user?.skills?.includes(s));
      const bMatches = b.skillsNeeded?.some(s => user?.skills?.includes(s));
      if (aMatches && !bMatches) return -1;
      if (!aMatches && bMatches) return 1;
      return 0;
    })
    .slice(0, 4); // Show up to 4

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name?.split(' ')[0]}! 👋</h1>
        <p className="mt-2 text-slate-400">You have 1 active task for today.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          label="Tasks Completed" 
          value={user?.tasksCompleted || 0} 
          icon={HiOutlineUserGroup} 
          trend="+2 this month"
          color="purple"
        />
        <StatsCard 
          label="Hours Contributed" 
          value={user?.hoursContributed || 0} 
          icon={HiOutlineClock} 
          trend="+14h this week"
          color="blue"
        />
        <StatsCard 
          label="Certificates" 
          value={user?.certificatesEarned || 0} 
          icon={HiOutlineLibrary} 
          color="amber"
        />
        <div className="flex flex-col justify-center items-center rounded-[2rem] border-2 border-dashed border-white/10 bg-white/5 p-6 transition-all hover:border-amber-300/30 hover:bg-white/[0.07]">
           <HiOutlinePlusCircle className="h-8 w-8 text-slate-500 mb-2" />
           <p className="text-sm font-bold text-slate-400">New Goal</p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Recommended for you</h2>
            <Link to="/feed" className="text-sm font-bold text-amber-200/80 hover:text-amber-100 uppercase tracking-widest">View All</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 items-start">
            {recommendedRequests.map(req => (
              <RequestCard key={req.id} request={req} onAction={() => {}} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Active Tasks</h2>
          <div className="space-y-4">
            {user?.activeTasks?.map(task => (
              <div key={task.requestId} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex justify-between items-start">
                  <span className="rounded-full bg-purple-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-400 border border-purple-400/20">
                    In Progress
                  </span>
                </div>
                <h4 className="mt-3 text-sm font-bold text-white leading-snug">{task.title}</h4>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-6 w-6 rounded-full border-2 border-slate-950 bg-slate-800" />
                    ))}
                    <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-950 bg-slate-900 text-[8px] font-bold text-slate-400">+5</div>
                  </div>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-amber-200/80 hover:text-amber-100">Details</button>
                </div>
              </div>
            ))}
            
            <div className="rounded-[2.5rem] bg-gradient-to-br from-[#1b1444] to-[#2a1d63] p-8 shadow-2xl shadow-amber-500/10 border border-amber-400/20 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 text-amber-400/10 group-hover:scale-110 transition-transform duration-500">
                <HiOutlineSparkles className="h-32 w-32" />
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200 flex items-center gap-2">
                <HiOutlineSparkles className="h-4 w-4" />
                Pro Tip
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                Adding your specific skills like <span className="text-white font-medium">"Teaching"</span> or <span className="text-white font-medium">"First Aid"</span> helps our AI match you with higher impact tasks.
              </p>
              <Link 
                to="/profile"
                className="mt-6 inline-block text-xs font-bold text-white underline decoration-amber-400/50 underline-offset-8 hover:text-amber-200 transition-colors"
              >
                Update Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
