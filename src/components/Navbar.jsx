import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar({ onAuthClick }) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    return `/${user.role}-dashboard`;
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
        <Link to="/" className="flex items-center gap-3 text-lg font-semibold text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#f59e0b]/80 shadow-glow">
            <span className="text-lg">⛓️</span>
          </div>
          <span>ImpactBridge</span>
        </Link>

        <nav className="hidden items-center gap-8 text-slate-300 md:flex">
          <Link to="/" className="transition hover:text-white">Home</Link>
          <a href="#about" className="transition hover:text-white">About</a>
          <a href="#features" className="transition hover:text-white">Features</a>
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to={getDashboardPath()}
                className="rounded-full bg-white/5 border border-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-400/10 border border-red-400/20 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-400/20"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onAuthClick}
              className="rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/15 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
