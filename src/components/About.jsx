import ngoImage from '../images/ngo-on-ground.webp';

function About() {
  return (
    <section id="about" className="mt-24 rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-xl shadow-slate-950/20 sm:p-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-200">About ImpactBridge</p>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            A smarter way to coordinate aid, volunteers, and corporate giving.
          </h2>
          <p className="max-w-xl text-base leading-8 text-slate-300">
            ImpactBridge brings together communities, nonprofits, and businesses through a secure and elegant platform. Every connection is designed to ensure accountability, visibility, and meaningful action.
          </p>
          <p className="text-base leading-7 text-slate-300">
            The platform is ideal for organizations seeking a premium collaboration experience that is both impactful and easy to manage.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/60 shadow-lg shadow-slate-950/20">
          <img
            src={'src/images/ngo-on-ground.webp'}
            alt="NGO team working on ground"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
