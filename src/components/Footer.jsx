function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80 py-8 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:px-8 lg:px-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-semibold text-white">ImpactBridge</p>
          <p className="mt-2 text-sm text-slate-400">Connecting NGOs, volunteers, and companies with trust.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href="#home" className="transition hover:text-white">
            Home
          </a>
          <a href="#about" className="transition hover:text-white">
            About
          </a>
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
        </div>
      </div>
      <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
        © 2026 ImpactBridge. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
