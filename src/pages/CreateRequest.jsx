import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, cities } from '../data/mockData';
import { HiOutlineChevronLeft, HiOutlineCloudUpload, HiCheckCircle } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

export default function CreateRequest() {
  const navigate = useNavigate();
  const { addRequest } = useAuth();
  const [type, setType] = useState('volunteer');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: categories[0],
    city: cities[0],
    volunteersNeeded: '',
    urgency: 'Medium',
    fundingGoal: '',
    deadline: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRequest({
      ...formData,
      type,
      volunteersNeeded: Math.max(parseInt(formData.volunteersNeeded) || 1, 1),
      fundingGoal: Math.max(parseInt(formData.fundingGoal) || 1, 1),
    });
    
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/ngo-dashboard');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
        <div className="h-24 w-24 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 shadow-glow shadow-emerald-500/20">
          <HiCheckCircle className="h-12 w-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-white">Request Published!</h2>
          <p className="text-slate-400 max-w-sm">Your initiative is now live and visible to the entire ImpactBridge community.</p>
        </div>
        <div className="flex items-center gap-2 text-amber-200 text-sm font-bold animate-pulse">
          Redirecting to dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition"
      >
        <HiOutlineChevronLeft className="h-5 w-5" />
        Back to Dashboard
      </button>

      <div>
        <h1 className="text-4xl font-bold text-white">Create a New Request</h1>
        <p className="mt-2 text-lg text-slate-400">Post a need for volunteers or funding to the community.</p>
      </div>

      <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-10 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Request Type */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Request Type</label>
            <div className="grid grid-cols-2 gap-4 p-1.5 bg-white/5 rounded-2xl border border-white/5">
              <button
                type="button"
                onClick={() => setType('volunteer')}
                className={`py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition ${
                  type === 'volunteer' ? 'bg-white/10 text-amber-200 border border-white/10' : 'text-slate-500'
                }`}
              >
                Volunteer Help
              </button>
              <button
                type="button"
                onClick={() => setType('funding')}
                className={`py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition ${
                  type === 'funding' ? 'bg-white/10 text-amber-200 border border-white/10' : 'text-slate-500'
                }`}
              >
                Financial Funding
              </button>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Request Title</label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. English Teachers for Urban Slums"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 px-6 text-sm text-white outline-none transition focus:border-amber-300/30 focus:bg-white/10"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Description</label>
              <textarea
                required
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                placeholder="Describe the project, who it helps, and exactly what is needed..."
                className="w-full rounded-[2rem] border border-white/10 bg-white/5 py-4 px-6 text-sm text-white outline-none transition focus:border-amber-300/30 focus:bg-white/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Category</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-900 py-4 px-6 text-sm text-white outline-none transition focus:border-amber-300/30"
              >
                {categories.map(cat => <option key={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Target City</label>
              <select 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-white/10 bg-slate-900 py-4 px-6 text-sm text-white outline-none transition focus:border-amber-300/30"
              >
                {cities.map(city => <option key={city}>{city}</option>)}
              </select>
            </div>

            {type === 'volunteer' ? (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Volunteers Needed</label>
                  <input
                    type="number"
                    name="volunteersNeeded"
                    value={formData.volunteersNeeded}
                    onChange={handleInputChange}
                    placeholder="10"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 px-6 text-sm text-white outline-none transition focus:border-amber-300/30 focus:bg-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Urgency</label>
                  <select 
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 py-4 px-6 text-sm text-white outline-none transition focus:border-amber-300/30"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Funding Goal (₹)</label>
                  <input
                    type="number"
                    name="fundingGoal"
                    value={formData.fundingGoal}
                    onChange={handleInputChange}
                    placeholder="500000"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 px-6 text-sm text-white outline-none transition focus:border-amber-300/30 focus:bg-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-white/10 bg-slate-900 py-4 px-6 text-sm text-white outline-none transition focus:border-amber-300/30"
                  />
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Image / Proof</label>
            <div className="flex flex-col items-center justify-center h-48 rounded-[2rem] border-2 border-dashed border-white/10 bg-white/5 transition hover:border-amber-300/20 hover:bg-white/10 cursor-pointer">
              <HiOutlineCloudUpload className="h-10 w-10 text-slate-500 mb-4" />
              <p className="text-sm font-bold text-slate-400">Upload cover image or project proposal</p>
              <p className="mt-1 text-[10px] text-slate-600 uppercase tracking-widest">JPG, PNG or PDF up to 10MB</p>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 rounded-2xl border border-white/10 bg-white/5 py-4 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-[2] rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 py-4 text-sm font-bold text-slate-950 transition hover:shadow-lg hover:shadow-amber-500/20"
            >
              Publish Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
