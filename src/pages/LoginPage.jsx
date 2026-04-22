import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineMail, HiOutlineLockClosed, HiArrowRight } from 'react-icons/hi';

const roles = [
  { id: 'volunteer', name: 'Volunteer', icon: '🤝' },
  { id: 'ngo', name: 'NGO', icon: '🏢' },
  { id: 'company', name: 'Company', icon: '💼' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('volunteer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(selectedRole);
    const from = location.state?.from?.pathname || `/${selectedRole}-dashboard`;
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#05122f] flex flex-col items-center justify-center p-6 text-slate-100">
      <div className="absolute inset-0 bg-royal-glow opacity-50 pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Link to="/" className="flex items-center justify-center gap-3 mb-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#f59e0b]/80 shadow-glow">
            <span className="text-xl">⛓️</span>
          </div>
          <span className="text-2xl font-bold tracking-tight">ImpactBridge</span>
        </Link>

        <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/50 p-8 backdrop-blur-xl shadow-2xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-400">Login to your account to continue impact.</p>
          </div>

          <div className="mb-8 flex gap-2 rounded-2xl bg-white/5 p-1.5 border border-white/5">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex-1 flex flex-col items-center py-3 rounded-xl transition-all duration-300 ${
                  selectedRole === role.id 
                    ? 'bg-white/10 text-amber-200 shadow-sm border border-white/10' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <span className="text-xl mb-1">{role.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest">{role.name}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm outline-none transition focus:border-amber-300/30 focus:bg-white/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Password</label>
                <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-amber-200/80 hover:text-amber-100">Forgot?</a>
              </div>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm outline-none transition focus:border-amber-300/30 focus:bg-white/10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 mt-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 py-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
            >
              Sign In
              <HiArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-amber-200/80 hover:text-amber-100">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
