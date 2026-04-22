import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-amber-200 ring-1 ring-amber-300/15">
            Trusted platform for social impact
          </div>
          <div className="space-y-6">
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Connecting Hearts, Empowering Change
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              A smart platform that connects NGOs, volunteers, and companies to create real social impact.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f59e0b] px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5 sm:w-auto"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:border-amber-300/30 hover:bg-white/10 sm:w-auto"
            >
              Login / Sign Up
            </Link>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/20">
            <div className="placeholder-box">
                <img src="src/images/volunteering-people.jfif" alt="Illustration of volunteers and NGOs collaborating" className="w-full rounded-lg object-cover" />
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-xl shadow-slate-950/35 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between rounded-3xl bg-white/5 p-4 text-sm text-slate-300 shadow-inner shadow-white/5">
            <span className="font-medium text-white">ImpactBridge community</span>
            <span className="rounded-full bg-amber-400/15 px-3 py-1 text-amber-200">Premium</span>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-[#1b1444] to-[#2a1d63] p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-200">Building trust</p>
              <p className="mt-4 text-base leading-7 text-slate-200">
                Curated collaborations between volunteers, NGOs, and companies are managed with clarity and care.
              </p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-[#1b1444] to-[#2a1d63] p-6 shadow-glow">
              <p className="text-sm uppercase tracking-[0.24em] text-amber-200">Smart intelligence</p>
              <p className="mt-4 text-base leading-7 text-slate-200">
                Role-based matching makes it easy to connect resources where they are needed most.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
