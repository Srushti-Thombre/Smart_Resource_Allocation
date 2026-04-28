import { useState, useEffect } from 'react';
import { HiOutlineUserGroup, HiOutlineCash, HiOutlineClipboardList, HiOutlinePlus, HiOutlineX, HiOutlineLocationMarker } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';
const NGO_NAME = 'Helping Hands NGO';

export default function NGODashboard() {
  const { user } = useAuth();
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [activeRequests, setActiveRequests] = useState([]);
  const [donationsReceived, setDonationsReceived] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: 'India',
    skillsRequired: '',
    type: 'volunteer',
    amountNeeded: 0
  });

  // Fetch active requests on component mount
  useEffect(() => {
    fetchActiveRequests();
    fetchDonations();
  }, []);

  const fetchActiveRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/requests`);
      const data = await response.json();
      setActiveRequests(data.data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const fetchDonations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/donate?ngoName=${NGO_NAME}`);
      const data = await response.json();
      setDonationsReceived(data.data || []);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const totalDonations = donationsReceived.reduce((sum, d) => sum + d.amount, 0);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          type: formData.type,
          location: formData.location,
          skillsRequired: formData.skillsRequired || 'Any',
          amountNeeded: formData.type === 'funding' ? parseInt(formData.amountNeeded) : 0,
          ngoName: NGO_NAME
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Request created successfully!' });
        setShowRequestModal(false);
        setFormData({
          title: '',
          description: '',
          location: 'India',
          skillsRequired: '',
          type: 'volunteer',
          amountNeeded: 0
        });
        // Refresh requests
        fetchActiveRequests();
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create request' });
      }
    } catch (error) {
      console.error('Error submitting request:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Success/Error Message */}
      {message.text && (
        <div className={`rounded-3xl p-6 border-l-4 ${
          message.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300' 
            : 'bg-red-500/10 border-red-500 text-red-300'
        }`}>
          <p className="font-bold">{message.text}</p>
        </div>
      )}

      {/* Post New Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-lg sm:max-w-xl rounded-3xl border border-white/10 bg-slate-900 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-white/10 px-6 sm:px-8 py-5 sm:py-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Post New Request</h2>
              <button 
                onClick={() => setShowRequestModal(false)}
                className="rounded-xl p-2 hover:bg-white/10 flex-shrink-0"
              >
                <HiOutlineX className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmitRequest} className="space-y-5 sm:space-y-6 p-6 sm:p-8 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Request Type</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleFormChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400/30 focus:bg-white/10"
                >
                  <option value="volunteer">Volunteer Request</option>
                  <option value="funding">Funding Request</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Title</label>
                <input 
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="e.g., Community Outreach Program"
                  required
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
                  required
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
                {formData.type === 'volunteer' ? (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Skills Required</label>
                    <input 
                      type="text"
                      name="skillsRequired"
                      value={formData.skillsRequired}
                      onChange={handleFormChange}
                      placeholder="e.g., Teaching, First Aid"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-amber-400/30 focus:bg-white/10"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Amount Needed (₹)</label>
                    <input 
                      type="number"
                      name="amountNeeded"
                      value={formData.amountNeeded}
                      onChange={handleFormChange}
                      placeholder="e.g., 100000"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-amber-400/30 focus:bg-white/10"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  disabled={loading}
                  className="flex-1 rounded-2xl border border-white/10 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/5 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-bold uppercase tracking-widest text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-xl transition disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Post Request'}
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
        <h2 className="text-2xl font-bold text-white">Active Requests ({activeRequests.length})</h2>
        {activeRequests.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-12 text-center">
            <p className="text-slate-400">No active requests yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeRequests.map((request) => (
              <div key={request.id} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[0.08] hover:border-white/20 transition-all shadow-lg hover:shadow-xl hover:shadow-white/5">
                <div className="rounded-t-2xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border-b border-white/10 p-6 min-h-20 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl mb-2">{request.type === 'volunteer' ? '🤝' : '💰'}</p>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-300">{request.type}</span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{request.title}</h3>
                    <p className="text-sm text-slate-400 mb-3">{request.description.substring(0, 80)}...</p>
                    <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                      <HiOutlineLocationMarker className="h-4 w-4 text-amber-400" />
                      {request.location}
                    </div>
                  </div>

                  <div className="space-y-2 bg-white/5 rounded-2xl p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">
                        {request.type === 'volunteer' ? 'Volunteers Joined' : 'Amount Needed'}
                      </span>
                      <span className="font-bold text-white">
                        {request.type === 'volunteer' ? request.volunteersJoined : `₹${request.amountNeeded.toLocaleString()}`}
                      </span>
                    </div>
                    {request.skillsRequired && (
                      <div className="text-xs text-slate-500">
                        <span className="text-amber-300">Skills:</span> {request.skillsRequired}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                      request.status === 'open' 
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
        )}
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
              <p className="text-3xl font-bold text-white">₹{donationsReceived.length > 0 ? (totalDonations / donationsReceived.length / 100000).toFixed(1) : '0'}L</p>
            </div>
          </div>

          {donationsReceived.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p>No donations yet. Share your requests to attract donors!</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {donationsReceived.map((donation) => (
                <div key={donation._id} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition">
                  <div>
                    <p className="text-sm font-bold text-white">{donation.companyName}</p>
                    <p className="text-xs text-slate-400 mt-1">{new Date(donation.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="text-lg font-bold text-amber-400">₹{donation.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
