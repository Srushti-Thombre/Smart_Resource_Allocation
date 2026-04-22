export default function PartnerTicker() {
  const partners = [
    { name: 'Red Cross', icon: '🏥', color: 'text-red-400' },
    { name: 'UNICEF', icon: '🇺🇳', color: 'text-blue-400' },
    { name: 'WWF', icon: '🐼', color: 'text-slate-200' },
    { name: 'Save the Children', icon: '🧒', color: 'text-orange-400' },
    { name: 'Greenpeace', icon: '🌍', color: 'text-emerald-400' },
    { name: 'Doctors Without Borders', icon: '🩺', color: 'text-red-500' },
    { name: 'Amnesty International', icon: '🕯️', color: 'text-yellow-400' },
    { name: 'Care', icon: '🤝', color: 'text-purple-400' },
  ];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-transparent via-white/5 to-transparent py-12 border-y border-white/5 backdrop-blur-sm">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...partners, ...partners].map((partner, index) => (
          <div key={index} className="mx-12 flex items-center gap-4 opacity-70 hover:opacity-100 transition-all duration-500 hover:scale-110">
            <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">{partner.icon}</span>
            <span className={`text-xl font-bold tracking-tight uppercase ${partner.color}`}>{partner.name}</span>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
      `}} />
    </div>
  );
}
