import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineOfficeBuilding, HiOutlineLocationMarker, HiArrowRight, HiOutlinePhone } from 'react-icons/hi';

const roles = [
  { id: 'volunteer', name: 'Volunteer', icon: '🤝', subtitle: 'Help with your skills' },
  { id: 'ngo', name: 'NGO', icon: '🏢', subtitle: 'Manage initiatives' },
  { id: 'company', name: 'Company', icon: '💼', subtitle: 'Support causes' },
];

export default function RegisterPage() {
  const [selectedRole, setSelectedRole] = useState('volunteer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    orgName: '',
    taxId: '',
    phone: '',
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(selectedRole, formData);
    navigate(`/${selectedRole}-dashboard`);
  };

  return (
    <div className="min-h-screen bg-[#05122f] flex flex-col items-center justify-center p-6 text-slate-100">
      <div className="absolute inset-0 bg-royal-glow opacity-50 pointer-events-none"></div>
      
      <div className="w-full max-w-xl relative z-10 py-12">
        <Link to="/" className="flex items-center justify-center gap-3 mb-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#f59e0b]/80 shadow-glow">
            <span className="text-lg">⛓️</span>
          </div>
          <span className="text-xl font-bold tracking-tight">ImpactBridge</span>
        </Link>

        <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/50 p-10 backdrop-blur-xl shadow-2xl">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-white">Join the community</h1>
            <p className="mt-3 text-slate-400">Choose your path and start making a difference.</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-10">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex flex-col items-center p-4 rounded-3xl transition-all duration-300 border ${
                  selectedRole === role.id 
                    ? 'bg-amber-400/10 text-amber-200 border-amber-400/20 shadow-glow' 
                    : 'bg-white/5 text-slate-500 border-transparent hover:bg-white/10 hover:text-slate-300'
                }`}
              >
                <span className="text-3xl mb-2">{role.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-center">{role.name}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  {selectedRole === 'volunteer' ? 'Full Name' : 'Contact Person'}
                </label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm outline-none transition focus:border-amber-300/30 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  {selectedRole === 'volunteer' ? 'City' : 'Organization Name'}
                </label>
                <div className="relative">
                  {selectedRole === 'volunteer' ? (
                    <HiOutlineLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                  ) : (
                    <HiOutlineOfficeBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                  )}
                  <input
                    name={selectedRole === 'volunteer' ? 'city' : 'orgName'}
                    required
                    value={selectedRole === 'volunteer' ? formData.city : formData.orgName}
                    onChange={handleInputChange}
                    placeholder={selectedRole === 'volunteer' ? 'e.g. Mumbai' : 'EcoCare Foundation'}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm outline-none transition focus:border-amber-300/30 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm outline-none transition focus:border-amber-300/30 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number (for SMS alerts)</label>
                <div className="relative">
                  <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm outline-none transition focus:border-amber-300/30 focus:bg-white/10"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm outline-none transition focus:border-amber-300/30 focus:bg-white/10"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 mt-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 py-4 text-sm font-bold text-slate-950 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
            >
              Create Account
              <HiArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-amber-200/80 hover:text-amber-100">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
