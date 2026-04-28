import { HiOutlineExternalLink, HiOutlineSparkles, HiOutlineShare } from 'react-icons/hi';
import HeatmapDisplay from '../components/HeatmapDisplay';

export default function ImpactFeed() {
  const reports = [
    {
      id: 1,
      title: 'Dharavi Education Initiative - Q1 Update',
      ngo: 'Hope Foundation',
      impact: '150 students provided with digital tablets.',
      date: 'April 20, 2026',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      stats: ['150 Tablets', '3 Schools', '98% Attendance']
    },
    {
      id: 2,
      title: 'Urban Garden Project Completion',
      ngo: 'Green Earth Initiative',
      impact: 'Successfully planted 500 saplings in Pune city center.',
      date: 'April 18, 2026',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
      stats: ['500 Saplings', '1.2 Acres', '12 Volunteers']
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      <div>
        <h1 className="text-4xl font-bold text-white tracking-tight">CSR Impact Feed</h1>
        <p className="mt-2 text-slate-400">Review the real-world results of your company's social contributions.</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight">Regional Impact Analysis</h2>
        <HeatmapDisplay />
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        {reports.map((report) => (
          <div key={report.id} className="group overflow-hidden rounded-[3rem] border border-white/10 bg-slate-950/40 backdrop-blur-xl transition hover:border-amber-400/20">
            <div className="relative h-64 overflow-hidden">
              <img src={report.image} alt={report.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-8">
                <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-950">
                  Impact Report
                </span>
                <h3 className="mt-2 text-2xl font-bold text-white">{report.title}</h3>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-amber-200">{report.ngo}</p>
                <p className="text-xs text-slate-500">{report.date}</p>
              </div>
              
              <p className="text-slate-400 leading-relaxed italic">"{report.impact}"</p>
              
              <div className="flex flex-wrap gap-4">
                {report.stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2 border border-white/5 text-[10px] font-bold text-slate-300">
                    <HiOutlineSparkles className="text-amber-400" />
                    {stat}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-white/5 flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-white/5 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition">
                  <HiOutlineExternalLink className="h-4 w-4" />
                  Full Report
                </button>
                <button className="rounded-2xl bg-white/5 p-4 text-white hover:bg-white/10 transition">
                  <HiOutlineShare className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
