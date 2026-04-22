import { HiOutlineSearch, HiOutlineShieldCheck, HiOutlineArrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function NGODirectory() {
  const ngos = [
    { id: 1, name: 'Hope Foundation', category: 'Education', location: 'Mumbai', verified: true, desc: 'Dedicated to providing quality education to underprivileged children.' },
    { id: 2, name: 'Sahara Relief Trust', category: 'Disaster Relief', location: 'Nashik', verified: true, desc: 'Rapid response team for natural disasters and humanitarian aid.' },
    { id: 3, name: 'Green Earth Initiative', category: 'Environment', location: 'Pune', verified: true, desc: 'Urban reforestation and sustainability advocacy.' },
    { id: 4, name: 'Shakti Women\'s Collective', category: 'Women Empowerment', location: 'Delhi', verified: true, desc: 'Empowering women through vocational training and legal aid.' },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">NGO Directory</h1>
          <p className="mt-2 text-slate-400">Discover verified non-profit partners for your CSR initiatives.</p>
        </div>
        <div className="relative">
          <HiOutlineSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by mission..."
            className="w-full sm:w-72 rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-amber-400/30"
          />
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {ngos.map((ngo) => (
          <div key={ngo.id} className="group rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-8 backdrop-blur-xl transition hover:border-amber-400/20">
            <div className="flex items-start justify-between mb-6">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-glow">
                {ngo.name[0]}
              </div>
              {ngo.verified && (
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-400/20">
                  <HiOutlineShieldCheck className="h-3 w-3" />
                  VERIFIED
                </div>
              )}
            </div>

            <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition">{ngo.name}</h3>
            <div className="flex items-center gap-2 mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <span>{ngo.category}</span>
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <span>{ngo.location}</span>
            </div>

            <p className="mt-4 text-sm text-slate-400 leading-relaxed line-clamp-2">
              {ngo.desc}
            </p>

            <Link 
              to={`/ngo/${ngo.id}`}
              className="mt-8 flex items-center justify-between w-full rounded-2xl bg-white/5 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition"
            >
              View Profile
              <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
