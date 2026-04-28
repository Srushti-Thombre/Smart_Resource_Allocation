const features = [
  {
    title: 'Smart Matching',
    description: 'Volunteers are notified based on skills, availability, and location.',
    icon: '📍',
  },
  {
    title: 'Verified NGOs',
    description: 'Only legally registered NGOs can access the platform.',
    icon: '🛡️',
  },
  {
    title: 'AI Heatmap',
    description: 'Visualize high-need zones with real-time geographic demand analysis.',
    icon: '🔥',
  },
];


function Features() {
  return (
    <section id="features" className="mt-20 space-y-10">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Platform features</p>
        <h2 className="mt-4 text-3xl font-semibold sm:text-4xl text-gradient">
          Powerful tools for trust and collaboration.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
          Empower communities with a premium experience built around safety, verification, and transparency.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-amber-300/20"
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-[#2b1b5e] to-[#452a97] text-2xl text-amber-200">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            <p className="mt-4 text-slate-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
