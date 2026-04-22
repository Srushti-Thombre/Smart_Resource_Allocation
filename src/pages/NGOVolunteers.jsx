import { HiOutlineMail, HiOutlinePhone, HiOutlineCheckCircle } from 'react-icons/hi';

export default function NGOVolunteers() {
  const volunteers = [
    { id: 1, name: 'Aarav Patel', task: 'English Teaching', joined: 'April 10, 2026', hours: '12h', status: 'Active' },
    { id: 2, name: 'Sanya Gupta', task: 'Flood Relief', joined: 'April 12, 2026', hours: '8h', status: 'Pending Approval' },
    { id: 3, name: 'Rohan Mehta', task: 'English Teaching', joined: 'April 14, 2026', hours: '4h', status: 'Active' },
    { id: 4, name: 'Isha Sharma', task: 'Urban Garden', joined: 'April 15, 2026', hours: '0h', status: 'Applied' },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">Volunteer Network</h1>
        <p className="mt-2 text-slate-400">Manage your active contributors and review new applications.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {volunteers.map((vol) => (
          <div key={vol.id} className="rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-8 transition-all hover:border-amber-400/20 hover:bg-white/[0.03]">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-glow">
                {vol.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{vol.name}</h3>
                <p className="text-xs text-amber-200/80 font-medium">{vol.task}</p>
              </div>
              
              <div className="w-full pt-4 border-t border-white/5 flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <span>Joined: {vol.joined}</span>
                <span className="text-white">{vol.hours}</span>
              </div>

              <div className="w-full flex gap-2 pt-4">
                <button className="flex-1 rounded-xl bg-white/5 p-3 text-slate-400 hover:text-white hover:bg-white/10 transition">
                  <HiOutlineMail className="h-5 w-5 mx-auto" />
                </button>
                <button className="flex-1 rounded-xl bg-white/5 p-3 text-slate-400 hover:text-white hover:bg-white/10 transition">
                  <HiOutlinePhone className="h-5 w-5 mx-auto" />
                </button>
                <button className="flex-[2] rounded-xl bg-amber-400/10 text-amber-200 border border-amber-400/20 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-400/20 transition">
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
