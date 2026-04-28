import { useState } from 'react';
import { HiOutlineUserGroup, HiOutlineCash, HiOutlineClipboardList, HiOutlinePlus, HiOutlineX, HiOutlineLocationMarker } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';

export default function NGODashboard() {
  const { user } = useAuth();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    skills: '',
    urgency: 'medium'
  });

  // Mock data for active requests
  const activeRequests = [
    {
      id: 1,
      title: 'Community Food Distribution',
      location: 'Mumbai, Maharashtra',
      volunteersJoined: 12,
      status: 'Open'
    },
    {
      id: 2,
      title: 'School Infrastructure Project',
      location: 'Pune, Maharashtra',
      volunteersJoined: 8,
      status: 'Open'
    },
    {
      id: 3,
      title: 'Environmental Clean-up Drive',
      location: 'Bangalore, Karnataka',
      volunteersJoined: 15,
      status: 'Closed'
    }
  ];

  // Mock data for donations
  const donationsReceived = [
    { id: 1, donor: 'Acme Corporation', amount: 500000, date: '2024-04-25' },
    { id: 2, donor: 'Tech Solutions Ltd', amount: 250000, date: '2024-04-20' },
    { id: 3, donor: 'Global Impact Fund', amount: 1000000, date: '2024-04-15' },
    { id: 4, donor: 'Community Supporters', amount: 75000, date: '2024-04-10' }
  ];

  const totalDonations = donationsReceived.reduce((sum, d) => sum + d.amount, 0);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    setShowRequestModal(false);
    setFormData({ title: '', description: '', location: '', skills: '', urgency: 'medium' });
  };

  return (
    <div className="space-y-10">
      {/* Post New Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Post New Request</h2>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="rounded-xl p-2 hover:bg-white/10"
              >
                <HiOutlineX className="h-6 w-6 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-6 p-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Title</label>
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="e.g., Community Outreach Program"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-amber-400/30 focus:bg-white/10"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Description</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Describe the initiative and its impact..."
                  rows="4"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-amber-400/30 focus:bg-white/10 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Location</label>
                  <input 
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    placeholder="City, Region"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-amber-400/30 focus:bg-white/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Urgency</label>
                  <select 
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleFormChange}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400/30 focus:bg-white/10"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Required Skills</label>
                <input 
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleFormChange}
                  placeholder="e.g., Teaching, First Aid, Driving"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-amber-400/30 focus:bg-white/10"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="flex-1 rounded-2xl border border-white/10 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/5 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-bold uppercase tracking-widest text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-xl transition"
                >
                  Post Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Welcome Card */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/20 p-8 shadow-lg shadow-purple-500/10">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.name || 'NGO'}! 👋</h1>
        <p className="text-slate-300">Manage your initiatives, requests, and donations all in one place.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          label="Volunteers Engaged" 
          value="47" 
          icon={HiOutlineUserGroup} 
          trend="+12 this month"
          color="purple"
        />
        <StatsCard 
          label="Total Funds Raised" 
          value="₹18,50,000" 
          icon={HiOutlineCash} 
          trend="+₹3,50,000 this month"
          color="amber"
        />
        <StatsCard 
          label="Active Requests" 
          value="3" 
          icon={HiOutlineClipboardList} 
          color="blue"
        />
      </div>

      {/* NGO Profile Section */}
      <div className="rounded-3xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 bg-white/5">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">About Our Organization</h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              Our NGO is dedicated to creating positive social impact through community engagement and resource mobilization. We work across multiple sectors including education, healthcare, and environmental conservation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <HiOutlineLocationMarker className="h-5 w-5 text-amber-400" />
                <span className="text-slate-300">Based in Mumbai, Maharashtra</span>
              </div>
              <div className="flex items-center gap-3">
                <HiOutlineUserGroup className="h-5 w-5 text-amber-400" />
                <span className="text-slate-300">Team of 25+ dedicated professionals</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 flex items-center justify-center p-8 text-center">
            <div>
              <p className="text-6xl mb-4">🏢</p>
              <p className="text-slate-400 text-sm">[Image: NGO team working on ground]</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-8 py-6 bg-white/[0.02] flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Ready to post a new initiative?</p>
            <p className="text-sm text-slate-300">Create a request to connect with volunteers and donors.</p>
          </div>
          <button 
            onClick={() => setShowRequestModal(true)}
            className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-xl transition whitespace-nowrap"
          >
            <HiOutlinePlus className="h-5 w-5" />
            Post Request
          </button>
        </div>
      </div>

      {/* Active Requests Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Active Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeRequests.map((request) => (
            <div key={request.id} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[0.08] hover:border-white/20 transition-all shadow-lg hover:shadow-xl hover:shadow-white/5">
              <div className="rounded-t-2xl bg-slate-900 border-b border-white/10 p-6 min-h-24 flex items-center justify-center text-center">
                <p className="text-slate-400 text-sm">[Image: {request.title}]</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{request.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                    <HiOutlineLocationMarker className="h-4 w-4 text-amber-400" />
                    {request.location}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Volunteers Joined</span>
                    <span className="font-bold text-white">{request.volunteersJoined}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                    request.status === 'Open' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-slate-500/10 text-slate-400'
                  }`}>
                    {request.status}
                  </span>
                  <button className="text-amber-400 text-sm font-bold hover:text-amber-300 transition">View Details →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donations Received Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Donations Received</h2>
        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-gradient-to-br from-amber-600/10 to-orange-600/10 border-b border-white/10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-200 mb-2">Total Raised</p>
              <p className="text-3xl font-bold text-white">₹{(totalDonations / 100000).toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-200 mb-2">Total Donors</p>
              <p className="text-3xl font-bold text-white">{donationsReceived.length}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-200 mb-2">Avg. Donation</p>
              <p className="text-3xl font-bold text-white">₹{(totalDonations / donationsReceived.length / 100000).toFixed(1)}L</p>
            </div>
          </div>

          <div className="divide-y divide-white/5">
            {donationsReceived.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition">
                <div>
                  <p className="text-sm font-bold text-white">{donation.donor}</p>
                  <p className="text-xs text-slate-400 mt-1">{new Date(donation.date).toLocaleDateString()}</p>
                </div>
                <span className="text-lg font-bold text-amber-400">₹{donation.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
