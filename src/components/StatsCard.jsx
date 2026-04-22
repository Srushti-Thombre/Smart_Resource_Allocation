export default function StatsCard({ label, value, icon: Icon, trend, color = 'amber' }) {
  const colorMap = {
    amber: 'from-amber-400/20 to-amber-500/10 text-amber-200',
    purple: 'from-purple-400/20 to-purple-500/10 text-purple-200',
    blue: 'from-blue-400/20 to-blue-500/10 text-blue-200',
    green: 'from-emerald-400/20 to-emerald-500/10 text-emerald-200',
  };

  return (
    <div className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]">
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${colorMap[color]} shadow-glow`}>
          <Icon className="h-6 w-6" />
        </div>
        {trend && (
          <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-emerald-400' : 'text-slate-400'}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-6">
        <p className="text-sm font-medium text-slate-400">{label}</p>
        <p className="mt-1 text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
