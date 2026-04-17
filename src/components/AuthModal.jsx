import { useEffect, useState } from 'react';

const roles = [
  {
    name: 'Individual (Volunteer)',
    subtitle: 'Contribute your time and skills',
    icon: '🤝',
  },
  {
    name: 'NGO',
    subtitle: 'Manage initiatives and request support',
    icon: '🏢',
  },
  {
    name: 'Company',
    subtitle: 'Support causes through funding',
    icon: '💼',
  },
];

function AuthModal({ open, onClose }) {
  const [step, setStep] = useState('selectRole');
  const [selectedRole, setSelectedRole] = useState(null);
  const [authMode, setAuthMode] = useState(null);

  useEffect(() => {
    if (!open) {
      setStep('selectRole');
      setSelectedRole(null);
      setAuthMode(null);
    }
  }, [open]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setStep('authOptions');
    setAuthMode(null);
  };

  const handleBack = () => {
    setStep('selectRole');
    setSelectedRole(null);
    setAuthMode(null);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/30 transition duration-300 ease-out">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">{step === 'selectRole' ? 'Who are you?' : selectedRole}</h2>
            <p className="mt-1 text-sm text-slate-400">
              {step === 'selectRole'
                ? 'Select your role to continue.'
                : authMode
                ? `Enter your ${authMode.toLowerCase()} details.`
                : 'Choose Login or Sign Up.'}
            </p>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/5 px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10">
            Close
          </button>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          {step === 'selectRole' && (
            <div className="grid gap-4 sm:grid-cols-3">
              {roles.map((role) => (
                <button
                  key={role.name}
                  onClick={() => handleRoleSelect(role.name)}
                  className="group flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-6 text-left transition duration-200 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/10"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-[#311b66] to-[#5f3fb3] text-2xl text-amber-200 shadow-glow">
                    {role.icon}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{role.name}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{role.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 'authOptions' && (
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  onClick={() => setAuthMode('Login')}
                  className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1743] to-[#312c67] px-6 py-5 text-left text-white transition hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/10"
                >
                  <p className="text-xl font-semibold">Login</p>
                  <p className="mt-2 text-sm text-slate-300">Access your existing account.</p>
                </button>
                <button
                  onClick={() => setAuthMode('Sign Up')}
                  className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1743] to-[#312c67] px-6 py-5 text-left text-white transition hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/10"
                >
                  <p className="text-xl font-semibold">Sign Up</p>
                  <p className="mt-2 text-sm text-slate-300">Create a new account quickly.</p>
                </button>
              </div>

              {authMode && (
                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/15 transition-all duration-300">
                  <div className="mb-6 rounded-3xl bg-slate-950 p-5 text-slate-300">
                    <p className="text-sm uppercase tracking-[0.2em] text-amber-200">{authMode}</p>
                    <p className="mt-3 text-base text-slate-200">{selectedRole} interface placeholder form</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-sm text-slate-300">Email</label>
                      <input
                        className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                        type="email"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-slate-300">Password</label>
                      <input
                        className="w-full rounded-3xl border border-white/10 bg-slate-950/80 px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
                        type="password"
                        placeholder="••••••••"
                      />
                    </div>
                    <button className="w-full rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
                      {authMode}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
            <button onClick={handleBack} className="text-amber-200 transition hover:text-amber-100">
              Back
            </button>
            <button onClick={onClose} className="text-slate-400 transition hover:text-white">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
