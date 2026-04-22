import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineChevronLeft, HiOutlineX, HiOutlineLocationMarker, HiOutlineOfficeBuilding, HiOutlinePhone } from 'react-icons/hi';

const roles = [
  {
    id: 'volunteer',
    name: 'Volunteer',
    subtitle: 'Contribute skills',
    icon: '🤝',
    color: 'blue'
  },
  {
    id: 'ngo',
    name: 'NGO',
    subtitle: 'Manage impact',
    icon: '🏢',
    color: 'amber'
  },
  {
    id: 'company',
    name: 'Company',
    subtitle: 'Support causes',
    icon: '💼',
    color: 'purple'
  },
];

function AuthModal({ open, onClose }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState('selectRole'); // selectRole, authForm
  const [selectedRole, setSelectedRole] = useState(null);
  const [authMode, setAuthMode] = useState('Login'); // Login, Sign Up
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep('selectRole');
      setSelectedRole(null);
      setAuthMode('Login');
      setFormData({ name: '', email: '', password: '', phone: '', city: '', orgName: '' });
    }
  }, [open]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep('authForm');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      if (authMode === 'Login') {
        login(selectedRole.id);
      } else {
        register(selectedRole.id, formData);
      }
      
      setIsProcessing(false);
      onClose();
      
      // Redirect based on role
      const routes = {
        volunteer: '/volunteer-dashboard',
        ngo: '/ngo-dashboard',
        company: '/company-dashboard'
      };
      navigate(routes[selectedRole.id]);
    }, 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900 shadow-2xl animate-bounce-in max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-8 py-6 sticky top-0 bg-slate-900 z-10">
          <div className="flex items-center gap-3">
            {step === 'authForm' && (
              <button onClick={() => setStep('selectRole')} className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition">
                <HiOutlineChevronLeft className="h-5 w-5" />
              </button>
            )}
            <div>
              <h2 className="text-xl font-bold text-white">
                {step === 'selectRole' ? 'Welcome to ImpactBridge' : `${authMode} as ${selectedRole.name}`}
              </h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">
                {step === 'selectRole' ? 'Select your role to continue' : 'Enter your credentials below'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white transition">
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8">
          {step === 'selectRole' ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role)}
                  className="group flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 text-center transition hover:border-amber-400/30 hover:bg-white/10"
                >
                  <div className={`h-16 w-16 items-center justify-center rounded-2xl flex bg-${role.color}-500/10 text-3xl group-hover:scale-110 transition`}>
                    {role.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{role.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter mt-1 font-bold">{role.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
              <div className="flex rounded-2xl bg-white/5 p-1 mb-6">
                {['Login', 'Sign Up'].map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setAuthMode(mode)}
                    className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition ${authMode === mode ? 'bg-amber-400 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {authMode === 'Sign Up' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">
                      {selectedRole.id === 'volunteer' ? 'Full Name' : 'Contact Person'}
                    </label>
                    <div className="relative">
                      <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        required
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-amber-400/30 transition"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                {authMode === 'Sign Up' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">
                      {selectedRole.id === 'volunteer' ? 'City' : 'Organization Name'}
                    </label>
                    <div className="relative">
                      {selectedRole.id === 'volunteer' ? (
                        <HiOutlineLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      ) : (
                        <HiOutlineOfficeBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      )}
                      <input
                        required
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-amber-400/30 transition"
                        placeholder={selectedRole.id === 'volunteer' ? 'Mumbai' : 'Eco Foundation'}
                        value={selectedRole.id === 'volunteer' ? formData.city : formData.orgName}
                        onChange={e => setFormData({...formData, [selectedRole.id === 'volunteer' ? 'city' : 'orgName']: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className={`space-y-2 ${authMode === 'Login' ? 'md:col-span-2' : ''}`}>
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Email Address</label>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      required
                      type="email"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-amber-400/30 transition"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                {authMode === 'Sign Up' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-2">Phone Number</label>
                    <div className="relative">
                      <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        required
                        type="tel"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-amber-400/30 transition"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2 md:col-span-2">
                  <div className="flex justify-between ml-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Password</label>
                    {authMode === 'Login' && <button type="button" className="text-[10px] text-amber-200 font-bold uppercase">Forgot?</button>}
                  </div>
                  <div className="relative">
                    <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      required
                      type="password"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white text-sm outline-none focus:border-amber-400/30 transition"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <button
                disabled={isProcessing}
                className="w-full mt-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 py-4 text-sm font-bold uppercase tracking-widest text-slate-950 shadow-xl shadow-amber-400/20 transition hover:-translate-y-0.5 flex items-center justify-center gap-3"
              >
                {isProcessing ? <div className="h-5 w-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" /> : <>{authMode} to Dashboard</>}
              </button>
            </form>
          )}
        </div>

        <div className="border-t border-white/5 bg-white/[0.02] px-8 py-4 text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            By continuing, you agree to our <span className="text-slate-400">Terms of Service</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
