import { useState, useEffect } from 'react';
import { HiOutlineUserGroup, HiOutlineClock, HiOutlineLibrary, HiOutlineSparkles, HiOutlineLocationMarker, HiCheckCircle } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';
const VOLUNTEER_NAME = 'User';

export default function VolunteerDashboard() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [acceptedRequests, setAcceptedRequests] = useState(new Set());
  const [message, setMessage] = useState({ type: '', text: '' });

  // Mock data for contributions (will integrate with backend later)
  const myContributions = [
    {
      id: 1,
      title: 'Community Food Drive',
      ngoName: 'Helping Hands',
      date: '2024-04-20',
      hoursContributed: 4,
      status: 'Completed'
    },
    {
      id: 2,
      title: 'School Tutoring',
      ngoName: 'Education for All',
      date: '2024-04-15',
      hoursContributed: 3,
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Healthcare Camp',
      ngoName: 'Health Connect',
      date: '2024-05-01',
      hoursContributed: 0,
      status: 'Scheduled'
    }
  ];

  // Mock data for certificates
  const certificates = [
    { id: 1, name: 'Community Service Excellence', date: '2024-03-15' },
    { id: 2, name: 'Social Impact Champion', date: '2024-02-20' },
    { id: 3, name: 'Teaching Excellence Award', date: '2024-01-10' }
  ];

  const totalHours = myContributions.filter(c => c.status === 'Completed').reduce((sum, c) => sum + c.hoursContributed, 0);

  // Fetch volunteer opportunities on mount
  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/requests?type=volunteer`);
      const data = await response.json();
      setOpportunities(data.data || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      setMessage({ type: 'error', text: 'Failed to load opportunities' });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOpportunity = async (requestId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/requests/${requestId}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Opportunity accepted! Thank you for your contribution.' });
        setAcceptedRequests(new Set([...acceptedRequests, requestId]));
        // Refresh opportunities
        fetchOpportunities();
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to accept opportunity' });
      }
    } catch (error) {
      console.error('Error accepting opportunity:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
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

      {/* Welcome Card */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 p-8 shadow-lg shadow-indigo-500/10">
        <h1 className="text-3xl font-bold text-white mb-2">Hello, {VOLUNTEER_NAME}! 👋</h1>
        <p className="text-slate-300">Ready to make an impact? Explore opportunities and contribute to meaningful causes.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          label="Tasks Completed" 
          value={myContributions.filter(c => c.status === 'Completed').length} 
          icon={HiCheckCircle} 
          trend="+2 this month"
          color="emerald"
        />
        <StatsCard 
          label="Hours Contributed" 
          value={totalHours} 
          icon={HiOutlineClock} 
          trend="+14h this month"
          color="blue"
        />
        <StatsCard 
          label="Certificates Earned" 
          value={certificates.length} 
          icon={HiOutlineLibrary} 
          color="amber"
        />
        <div className="flex flex-col justify-center items-center rounded-[2rem] border-2 border-dashed border-white/10 bg-white/5 p-6 hover:border-amber-300/30 hover:bg-white/[0.07] transition cursor-pointer">
          <HiOutlineSparkles className="h-8 w-8 text-slate-500 mb-2" />
          <p className="text-sm font-bold text-slate-400">New Goal</p>
        </div>
      </div>

      {/* Nearby Opportunities Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Volunteer Opportunities ({opportunities.length})</h2>
          <button 
            onClick={fetchOpportunities}
            className="text-sm font-bold text-amber-200/80 hover:text-amber-100 uppercase tracking-widest"
          >
            Refresh →
          </button>
        </div>
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-slate-400">Loading opportunities...</p>
          </div>
        ) : opportunities.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-12 text-center">
            <p className="text-slate-400">No volunteer opportunities available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity) => (
              <div key={opportunity._id} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[0.08] hover:border-white/20 transition-all shadow-lg hover:shadow-xl hover:shadow-white/5">
                <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border-b border-white/10 p-6 min-h-20 flex items-center justify-center text-center">
                  <div>
                    <p className="text-3xl mb-2">🤝</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-purple-300">Volunteer</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{opportunity.title}</h3>
                    <p className="text-sm text-amber-200 font-medium mb-2">{opportunity.ngoName}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <HiOutlineLocationMarker className="h-4 w-4 text-amber-400" />
                      {opportunity.location}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Volunteers Joined</span>
                      <span className="font-bold text-white">{opportunity.volunteersJoined}</span>
                    </div>
                    {opportunity.skillsRequired && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Skill Required</span>
                        <span className="font-bold text-white">{opportunity.skillsRequired}</span>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => handleAcceptOpportunity(opportunity._id)}
                    disabled={acceptedRequests.has(opportunity._id)}
                    className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {acceptedRequests.has(opportunity._id) ? '✓ Accepted' : 'Accept Opportunity'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map Section */}
      <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border-b border-white/10 p-12 min-h-96 flex items-center justify-center text-center">
          <div>
            <p className="text-6xl mb-4">🗺️</p>
            <p className="text-slate-400 text-lg">Interactive Map Coming Soon</p>
            <p className="text-slate-500 text-sm mt-4">Map displaying volunteer opportunities near you</p>
          </div>
        </div>
      </div>

      {/* My Contributions Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">My Contributions</h2>
        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="divide-y divide-white/5">
            {myContributions.map((contribution) => (
              <div key={contribution.id} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white mb-1">{contribution.title}</h3>
                  <p className="text-xs text-slate-400 mb-2">{contribution.ngoName}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span>{new Date(contribution.date).toLocaleDateString()}</span>
                    <span>{contribution.hoursContributed} hours</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                    contribution.status === 'Completed' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {contribution.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificates Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Certificates & Awards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[0.08] hover:border-white/20 transition-all shadow-lg hover:shadow-xl hover:shadow-white/5">
              <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border-b border-white/10 p-8 min-h-48 flex items-center justify-center text-center">
                <div>
                  <p className="text-5xl mb-4">🏅</p>
                  <p className="text-slate-400 text-sm">Certificate Preview</p>
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-lg font-bold text-white">{cert.name}</h3>
                <p className="text-xs text-slate-400">{new Date(cert.date).toLocaleDateString()}</p>
                <button className="w-full text-center text-amber-400 text-sm font-bold hover:text-amber-300 transition">Download Certificate →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro Tip Section */}
      <div className="rounded-3xl bg-gradient-to-br from-[#1b1444] to-[#2a1d63] p-8 shadow-2xl shadow-amber-500/10 border border-amber-400/20">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200 flex items-center gap-2 mb-4">
          <HiOutlineSparkles className="h-4 w-4" />
          Pro Tip
        </p>
        <p className="text-sm leading-relaxed text-slate-300 mb-6">
          Adding specific skills to your profile like <span className="text-white font-medium">"Teaching"</span>, <span className="text-white font-medium">"First Aid"</span>, or <span className="text-white font-medium">"Programming"</span> helps our AI match you with higher-impact opportunities aligned with your strengths.
        </p>
        <a href="/profile" className="inline-block text-xs font-bold text-white underline decoration-amber-400/50 underline-offset-8 hover:text-amber-200 transition-colors">
          Update Your Skills
        </a>
      </div>
    </div>
  );
}
