function Navbar({ onAuthClick }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3 text-lg font-semibold text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#f59e0b]/80 shadow-glow">
            <span className="text-lg">⛓️</span>
          </div>
          <span>ImpactBridge</span>
        </div>

        <nav className="hidden items-center gap-8 text-slate-300 md:flex">
          <a href="#home" className="transition hover:text-white">Home</a>
          <a href="#about" className="transition hover:text-white">About</a>
          <a href="#features" className="transition hover:text-white">Features</a>
        </nav>

        <button
          onClick={onAuthClick}
          className="rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/15 transition hover:-translate-y-0.5 hover:shadow-xl"
        >
          Login / Sign Up
        </button>
      </div>
    </header>
  );
}

export default Navbar;
