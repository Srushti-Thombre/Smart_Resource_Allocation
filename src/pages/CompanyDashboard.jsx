import { useState } from 'react';
import { HiOutlineCash, HiOutlineLibrary, HiOutlineDocumentText, HiOutlineTrendingUp, HiOutlineHeart, HiCheckCircle, HiOutlineLocationMarker, HiOutlineX } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [donateAmount, setDonateAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);

  // Mock data for funding requests
  const fundingRequests = [
    {
      id: 1,
      ngoName: 'Hope Foundation',
      purpose: 'Scholarship for underprivileged students',
      amountNeeded: 500000,
      amountRaised: 320000,
      beneficiaries: 50
    },
    {
      id: 2,
      ngoName: 'Sahara Relief Trust',
      purpose: 'Disaster relief and rehabilitation',
      amountNeeded: 1000000,
      amountRaised: 650000,
      beneficiaries: 200
    },
    {
      id: 3,
      ngoName: 'Green Earth Initiative',
      purpose: 'Environmental conservation project',
      amountNeeded: 300000,
      amountRaised: 180000,
      beneficiaries: 100
    },
    {
      id: 4,
      ngoName: 'Health Connect',
      purpose: 'Rural healthcare camps',
      amountNeeded: 750000,
      amountRaised: 450000,
      beneficiaries: 1000
    }
  ];

  // Mock data for donation history
  const donationHistory = [
    { id: 1, ngoName: 'Hope Foundation', amount: 250000, date: '2024-04-15', purpose: 'Education Initiative' },
    { id: 2, ngoName: 'Sahara Relief Trust', amount: 500000, date: '2024-04-10', purpose: 'Emergency Relief' },
    { id: 3, ngoName: 'Green Earth Initiative', amount: 150000, date: '2024-03-20', purpose: 'Tree Planting' },
    { id: 4, ngoName: 'Health Connect', amount: 300000, date: '2024-03-05', purpose: 'Healthcare' }
  ];

  const totalDonated = donationHistory.reduce((sum, d) => sum + d.amount, 0);

  const handleDonate = () => {
    if (!donateAmount || isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  const closeDonateModal = () => {
    setSelectedRequest(null);
    setDonateAmount('');
    setStep(1);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-10">
      {/* Donation Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-slate-900 overflow-hidden shadow-2xl">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-8 text-slate-950">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Make a Contribution</h3>
                  <p className="text-sm font-medium opacity-80">Supporting {selectedRequest.ngoName}</p>
                </div>
                <button onClick={closeDonateModal} className="p-2">
                  <HiOutlineX className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Initiative</label>
                    <p className="text-white font-bold">{selectedRequest.purpose}</p>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Select Amount (INR)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                      <input 
                        type="number"
                        value={donateAmount}
                        onChange={(e) => setDonateAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pl-10 text-2xl font-bold text-white outline-none focus:border-amber-400/30"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {['50000', '100000', '500000'].map(amt => (
                        <button 
                          key={amt}
                          onClick={() => setDonateAmount(amt)}
                          className={`py-3 rounded-xl border transition font-bold text-xs ${donateAmount === amt ? 'bg-amber-400 border-amber-400 text-slate-950' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                        >
                          ₹{Number(amt).toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2 mb-2">
                      <HiCheckCircle className="h-3 w-3" />
                      Tax Benefits
                    </p>
                    <p className="text-xs text-slate-400">Section 80G eligible - Get instant receipt</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button onClick={closeDonateModal} className="flex-1 py-3 rounded-2xl border border-white/10 text-xs font-bold text-white uppercase tracking-widest hover:bg-white/5">Cancel</button>
                    <button 
                      onClick={() => setStep(2)}
                      disabled={!donateAmount}
                      className="flex-1 py-3 rounded-2xl bg-white text-slate-950 text-xs font-bold uppercase tracking-widest hover:bg-amber-400 transition disabled:opacity-50"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                   <div className="flex items-center justify-between mb-6">
                     <button onClick={() => setStep(1)} className="text-xs font-bold text-amber-200 uppercase">← Back</button>
                     <span className="text-xs font-bold text-slate-500">STEP 2 OF 2</span>
                   </div>

                   <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Payment Method</label>
                      {['Corporate Credit Card', 'Bank Transfer (NEFT)', 'CSR Wallet'].map((method, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/5 mb-3 cursor-pointer hover:border-amber-400/30">
                          <div className="h-5 w-5 rounded-full border-2 flex items-center justify-center" style={{borderColor: i === 0 ? '#fbbf24' : '#e2e8f0'}}>
                            {i === 0 && <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />}
                          </div>
                          <span className="text-sm font-bold text-white">{method}</span>
                        </div>
                      ))}
                   </div>

                   <button 
                     onClick={handleDonate}
                     disabled={isProcessing}
                     className="w-full py-4 rounded-2xl bg-amber-400 text-slate-950 text-sm font-bold uppercase tracking-widest shadow-lg shadow-amber-400/20 hover:shadow-xl transition disabled:opacity-50 flex items-center justify-center gap-2"
                   >
                     {isProcessing ? <div className="h-5 w-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" /> : `Pay ₹${Number(donateAmount).toLocaleString()}`}
                   </button>
                </div>
              )}

              {step === 3 && (
                <div className="py-8 text-center space-y-6">
                   <div className="h-20 w-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                     <HiCheckCircle className="h-10 w-10" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold text-white">Success!</h3>
                     <p className="text-slate-400 mt-2">Thank you for your donation of ₹{Number(donateAmount).toLocaleString()}.</p>
                   </div>
                   <button 
                    onClick={closeDonateModal}
                    className="w-full py-3 rounded-2xl border border-white/10 text-xs font-bold text-white uppercase tracking-widest hover:bg-white/5 transition"
                   >
                     Return to Dashboard
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Welcome Card */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-600/20 to-green-600/20 border border-emerald-500/20 p-8 shadow-lg shadow-emerald-500/10">
        <h1 className="text-3xl font-bold text-white mb-2">Make a Meaningful Impact</h1>
        <p className="text-slate-300">Through your contributions, you create meaningful change in communities. Explore funding opportunities aligned with your corporate values.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          label="Total Donated" 
          value={`₹${(totalDonated / 100000).toFixed(2)}L`} 
          icon={HiOutlineCash} 
          trend="+₹2,50,000 this year"
          color="green"
        />
        <StatsCard 
          label="NGOs Supported" 
          value={new Set(donationHistory.map(d => d.ngoName)).size} 
          icon={HiOutlineLibrary} 
          color="purple"
        />
        <StatsCard 
          label="Tax Receipts" 
          value={donationHistory.length} 
          icon={HiOutlineDocumentText} 
          color="blue"
        />
        <StatsCard 
          label="Impact Score" 
          value="9.2/10" 
          icon={HiOutlineTrendingUp} 
          color="amber"
        />
      </div>

      {/* Funding Requests Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Funding Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fundingRequests.map((request) => (
            <div key={request.id} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[0.08] hover:border-white/20 transition-all shadow-lg hover:shadow-xl hover:shadow-white/5 p-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{request.ngoName}</h3>
                <p className="text-sm text-slate-400">{request.purpose}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Progress</span>
                  <span className="font-bold text-amber-400">₹{(request.amountRaised / 100000).toFixed(1)}L / ₹{(request.amountNeeded / 100000).toFixed(1)}L</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500" style={{ width: `${(request.amountRaised / request.amountNeeded) * 100}%` }} />
                </div>
                <p className="text-xs text-slate-500">{request.beneficiaries} people will benefit</p>
              </div>

              <button 
                onClick={() => setSelectedRequest(request)}
                className="w-full rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-xl transition"
              >
                Donate Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Donation Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Donation Summary</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-white/10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Total Contributed</p>
              <p className="text-3xl font-bold text-white">₹{(totalDonated / 100000).toFixed(2)}L</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Causes Supported</p>
              <p className="text-3xl font-bold text-amber-400">{new Set(donationHistory.map(d => d.purpose)).size}</p>
            </div>
          </div>

          <div className="space-y-3">
            {donationHistory.slice(0, 4).map((donation) => (
              <div key={donation.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/[0.02] transition">
                <div>
                  <p className="text-sm font-bold text-white">{donation.ngoName}</p>
                  <p className="text-xs text-slate-500">{donation.purpose}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-amber-400">₹{donation.amount.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">{new Date(donation.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 p-8">
          <h2 className="text-xl font-bold text-white mb-6">Reports</h2>
          
          <div className="space-y-4">
            <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 flex items-center justify-center text-center">
              <div>
                <p className="text-4xl mb-3">📊</p>
                <p className="text-slate-400 text-sm">[Image: donation analytics chart]</p>
              </div>
            </div>

            <button className="w-full rounded-2xl bg-white/5 border border-white/10 py-3 text-sm font-bold text-white uppercase tracking-widest hover:bg-white/10 transition">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
