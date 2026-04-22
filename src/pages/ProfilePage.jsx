import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineBell, HiOutlineShieldCheck, HiOutlineGlobeAlt, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineCheckCircle } from 'react-icons/hi';
import { skillOptions } from '../data/mockData';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [selectedSkills, setSelectedSkills] = useState(user?.skills || []);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '+91 98765 43210',
    bio: user?.bio || '',
    address: user?.address || '',
    registrationId: user?.registrationId || 'NGO-IND-2026-991',
    website: user?.website || 'https://ngo-portal.org',
    csrFocus: user?.csrFocus || 'Education, Sustainability',
    budget: user?.budget || '5000000',
  });

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay
    setTimeout(() => {
      updateUser({ ...formData, skills: selectedSkills });
      setIsSaving(false);
      setShowSuccess(true);
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const tabs = [
    { id: 'general', name: 'General Info', icon: HiOutlineUser },
    { id: 'security', name: 'Security', icon: HiOutlineLockClosed },
    { id: 'notifications', name: 'Notifications', icon: HiOutlineBell },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-[2rem] bg-gradient-to-br from-[#8b5cf6] to-[#f59e0b]/80 flex items-center justify-center text-3xl font-bold text-white shadow-glow">
            {user?.avatar || 'U'}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white tracking-tight">{user?.name}</h1>
            <p className="mt-1 text-amber-200 font-bold uppercase tracking-widest text-xs">{user?.role} Profile Settings</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition">
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className={`px-8 py-3 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all duration-300 ${
              isSaving 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 hover:-translate-y-1'
            }`}
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 border-2 border-slate-600 border-t-slate-400 rounded-full animate-spin" />
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
          <div className="flex items-center gap-3 bg-emerald-500 text-white px-8 py-4 rounded-3xl shadow-2xl shadow-emerald-500/20 border border-white/20">
            <HiOutlineCheckCircle className="h-6 w-6" />
            <span className="font-bold tracking-tight">Profile updated successfully!</span>
          </div>
        </div>
      )}

      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        {/* Sidebar Tabs */}
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.id 
                  ? 'bg-white/10 text-white border border-white/10 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? 'text-amber-400' : ''}`} />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-10 backdrop-blur-xl">
          {activeTab === 'general' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                    <input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-amber-400/30 transition" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <div className="relative">
                    <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                    <input 
                      disabled
                      defaultValue={`${user?.name?.toLowerCase().replace(' ', '.')}@example.com`}
                      className="w-full rounded-2xl border border-white/5 bg-white/[0.02] py-4 pl-12 pr-4 text-sm text-slate-500 cursor-not-allowed" 
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number (for SMS alerts)</label>
                  <div className="relative">
                    <HiOutlinePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                    <input 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-amber-400/30 transition" 
                    />
                  </div>
                </div>
              </div>

              {user?.role === 'volunteer' && (
                <div className="space-y-6 pt-6 border-t border-white/5">
                   <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Skills & Interests</label>
                    <div className="flex flex-wrap gap-3">
                      {skillOptions.map(skill => (
                        <button
                          key={skill}
                          onClick={() => toggleSkill(skill)}
                          className={`rounded-xl px-4 py-2 text-xs font-bold transition-all border ${
                            selectedSkills.includes(skill)
                              ? 'bg-amber-400 border-amber-400 text-slate-950 shadow-lg shadow-amber-400/20'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Short Bio</label>
                    <textarea 
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      placeholder="Tell us about your passion for volunteering..."
                      className="w-full rounded-[2rem] border border-white/10 bg-white/5 py-4 px-6 text-sm text-white outline-none focus:border-amber-400/30 transition" 
                    />
                  </div>
                </div>
              )}

              {user?.role === 'ngo' && (
                <div className="space-y-6 pt-6 border-t border-white/5">
                   <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Registration ID</label>
                      <input 
                        value={formData.registrationId}
                        onChange={(e) => setFormData({...formData, registrationId: e.target.value})}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 px-6 text-sm text-white outline-none focus:border-amber-400/30 transition" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Website</label>
                      <div className="relative">
                        <HiOutlineGlobeAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                        <input 
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-amber-400/30 transition" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Organization Address (for live maps)</label>
                      <div className="relative">
                        <HiOutlineLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                        <input 
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          placeholder="Enter your physical office address..."
                          className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-amber-400/30 transition" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {user?.role === 'company' && (
                <div className="space-y-6 pt-6 border-t border-white/5">
                   <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">CSR Focus Area</label>
                      <input 
                        value={formData.csrFocus}
                        onChange={(e) => setFormData({...formData, csrFocus: e.target.value})}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 px-6 text-sm text-white outline-none focus:border-amber-400/30 transition" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Headquarters Address</label>
                      <div className="relative">
                        <HiOutlineLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                        <input 
                          value={formData.address}
                          onChange={(e) => setFormData({...formData, address: e.target.value})}
                          className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-sm text-white outline-none focus:border-amber-400/30 transition" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Annual CSR Budget (₹)</label>
                      <input 
                        type="number"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 px-6 text-sm text-white outline-none focus:border-amber-400/30 transition" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8 animate-fade-in">
               <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Current Password</label>
                  <input type="password" underline className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 px-6 text-sm text-white outline-none focus:border-amber-400/30 transition" />
               </div>
               <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">New Password</label>
                  <input type="password" underline className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 px-6 text-sm text-white outline-none focus:border-amber-400/30 transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Confirm New Password</label>
                  <input type="password" underline className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 px-6 text-sm text-white outline-none focus:border-amber-400/30 transition" />
                </div>
               </div>
               <div className="flex items-center gap-4 p-6 rounded-3xl bg-emerald-400/5 border border-emerald-400/10">
                  <HiOutlineShieldCheck className="h-8 w-8 text-emerald-400" />
                  <div>
                    <p className="text-sm font-bold text-white">Two-Factor Authentication is ON</p>
                    <p className="text-xs text-slate-500">Your account is protected by an extra layer of security.</p>
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-8 animate-fade-in">
               {[
                 { id: 'email-notif', title: 'Email Notifications', desc: 'Receive daily updates and project alerts via email.' },
                 { id: 'sms-notif', title: 'SMS Alerts', desc: 'Get urgent notifications for time-sensitive requests.' },
                 { id: 'marketing-notif', title: 'News & Updates', desc: 'Hear about platform features and success stories.' }
               ].map((item) => (
                 <div key={item.id} className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5">
                   <div>
                     <p className="text-sm font-bold text-white">{item.title}</p>
                     <p className="text-xs text-slate-500">{item.desc}</p>
                   </div>
                   <div className="relative inline-flex h-6 w-12 items-center rounded-full bg-amber-400 cursor-pointer">
                      <span className="translate-x-7 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                   </div>
                 </div>
               ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
