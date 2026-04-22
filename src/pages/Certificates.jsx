import { HiOutlineDownload, HiOutlineExternalLink, HiOutlineShare, HiOutlineShieldCheck } from 'react-icons/hi';

export default function Certificates() {
  const earnedCertificates = [
    {
      id: 'cert-1',
      title: 'Disaster Relief Hero',
      ngo: 'Sahara Relief Trust',
      date: 'March 20, 2026',
      hours: 45,
      level: 'Gold',
      color: 'from-amber-400/20 to-yellow-600/20 text-amber-200 border-amber-500/30'
    },
    {
      id: 'cert-2',
      title: 'Eco-Warrior Certification',
      ngo: 'Green Earth Initiative',
      date: 'February 15, 2026',
      hours: 20,
      level: 'Silver',
      color: 'from-slate-400/20 to-slate-600/20 text-slate-200 border-slate-500/30'
    },
    {
      id: 'cert-3',
      title: 'Youth Educator Award',
      ngo: 'Hope Foundation',
      date: 'January 28, 2026',
      hours: 30,
      level: 'Gold',
      color: 'from-amber-400/20 to-yellow-600/20 text-amber-200 border-amber-500/30'
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Achievements & Certifications</h1>
          <p className="mt-2 text-slate-400">Verifiable proof of your social impact and dedicated service hours.</p>
        </div>
        <button className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 transition">
          <HiOutlineDownload className="h-4 w-4" />
          Download Transcript
        </button>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {earnedCertificates.map(cert => (
          <div key={cert.id} className={`group relative rounded-[2.5rem] border bg-gradient-to-br ${cert.color} p-8 transition-all hover:-translate-y-2 hover:shadow-2xl`}>
            {/* Certificate Decorative Elements */}
            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition">
              <HiOutlineShieldCheck className="h-16 w-16" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/70 border border-white/10">
                  {cert.level} Badge
                </span>
                <h3 className="text-2xl font-bold text-white leading-tight">{cert.title}</h3>
                <p className="text-sm font-medium text-white/60">{cert.ngo}</p>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Earned On</p>
                  <p className="text-sm font-bold text-white">{cert.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Total Hours</p>
                  <p className="text-sm font-bold text-white">{cert.hours}h</p>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button className="flex-1 rounded-xl bg-white/10 py-3 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white/20 transition">
                  Download
                </button>
                <button className="flex items-center justify-center rounded-xl bg-white/10 p-3 text-white hover:bg-white/20 transition">
                  <HiOutlineShare className="h-4 w-4" />
                </button>
                <button className="flex items-center justify-center rounded-xl bg-white/10 p-3 text-white hover:bg-white/20 transition">
                  <HiOutlineExternalLink className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Locked Certificate Mock */}
        <div className="relative rounded-[2.5rem] border border-white/5 bg-slate-950/20 p-8 flex flex-col items-center justify-center text-center opacity-50 grayscale">
          <div className="h-20 w-20 rounded-full border border-dashed border-slate-700 flex items-center justify-center mb-6 text-3xl">
            🔒
          </div>
          <h3 className="text-lg font-bold text-white">Advanced First Aid</h3>
          <p className="text-xs text-slate-500 mt-2">Complete 10 more hours in Healthcare to unlock.</p>
        </div>
      </div>

      <section className="mt-20 rounded-[3rem] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold text-white">Verify Your Impact</h2>
          <p className="text-lg leading-relaxed text-slate-300">
            ImpactBridge certificates use unique digital signatures to prevent tampering. Every certificate can be verified by potential employers, universities, or social organizations via our public ledger.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-3 border border-white/5 text-xs font-bold text-slate-400">
               <HiOutlineShieldCheck className="h-5 w-5 text-emerald-400" />
               SECURE BLOCKCHAIN LOGS
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-5 py-3 border border-white/5 text-xs font-bold text-slate-400">
               <HiOutlineExternalLink className="h-5 w-5 text-blue-400" />
               API VERIFIABLE
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
