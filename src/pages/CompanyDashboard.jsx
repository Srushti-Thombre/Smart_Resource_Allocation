import { useState } from 'react';
import { HiOutlineCash, HiOutlineLibrary, HiOutlineDocumentText, HiOutlineTrendingUp, HiOutlineHeart } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import RequestCard from '../components/RequestCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function CompanyDashboard() {
  const { user, requests, donations, donateToRequest } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [donateAmount, setDonateAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Amount, 2: Payment, 3: Success

  // Filter funding requests for companies
  const fundingOpportunities = requests
    .filter(r => r.type === 'funding')
    .slice(0, 2);

  // Combine mock and live donations
  const allDonations = [...donations, ...(user?.donationHistory || [])];

  const handleDonate = () => {
    if (!donateAmount || isProcessing) return;
    setIsProcessing(true);
    setTimeout(() => {
      donateToRequest(selectedRequest.id, donateAmount);
      setIsProcessing(false);
      setStep(3); // Go to Success
    }, 2000);
  };

  const closeDonateModal = () => {
    setSelectedRequest(null);
    setDonateAmount('');
    setStep(1);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-10 relative">
      {/* Enhanced Donation Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-[2.5rem] border border-white/10 bg-slate-900 overflow-hidden shadow-2xl animate-bounce-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-8 text-slate-950">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Secure Contribution</h3>
                  <p className="text-sm font-medium opacity-80">Supporting {selectedRequest.ngoName}</p>
                </div>
                <HiOutlineHeart className="h-8 w-8 opacity-40" />
              </div>
            </div>

            <div className="p-8">
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Project Initiative</label>
                    <p className="text-white font-bold">{selectedRequest.title}</p>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Select Amount (INR)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                      <input 
                        type="number"
                        value={donateAmount}
                        onChange={(e) => setDonateAmount(e.target.value)}
                        placeholder="0.00"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 pl-10 text-2xl font-bold text-white outline-none focus:border-amber-400/30"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {['10000', '50000', '250000'].map(amt => (
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
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2">
                      <HiOutlineCheckCircle className="h-3 w-3" />
                      Tax Benefit Eligible (Section 80G)
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Your donation of ₹{Number(donateAmount || 0).toLocaleString()} will help provide essential resources for this cause.</p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button onClick={closeDonateModal} className="flex-1 py-4 rounded-2xl border border-white/10 text-xs font-bold text-white uppercase tracking-widest">Cancel</button>
                    <button 
                      onClick={() => setStep(2)}
                      disabled={!donateAmount}
                      className="flex-[2] py-4 rounded-2xl bg-white text-slate-950 text-xs font-bold uppercase tracking-widest hover:bg-amber-400 transition"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                   <div className="flex items-center justify-between text-white mb-8">
                     <button onClick={() => setStep(1)} className="text-xs font-bold text-amber-200 uppercase tracking-widest">← Back</button>
                     <span className="text-xs font-bold text-slate-500">STEP 2 OF 2</span>
                   </div>

                   <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 block">Choose Payment Method</label>
                      {['Corporate Credit Card', 'Bank Transfer (NEFT/IMPS)', 'CSR Wallet'].map((method, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 cursor-pointer hover:border-amber-400/30 transition">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                              <HiOutlineCash className="h-5 w-5 text-slate-400" />
                            </div>
                            <span className="text-sm font-bold text-white">{method}</span>
                          </div>
                          <div className={`h-5 w-5 rounded-full border-2 ${i === 0 ? 'border-amber-400 bg-amber-400' : 'border-white/10'}`} />
                        </div>
                      ))}
                   </div>

                   <div className="pt-6">
                      <button 
                        onClick={handleDonate}
                        disabled={isProcessing}
                        className="w-full py-5 rounded-2xl bg-amber-400 text-slate-950 text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-amber-400/20"
                      >
                        {isProcessing ? <div className="h-5 w-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" /> : <>Pay ₹{Number(donateAmount).toLocaleString()} Now</>}
                      </button>
                      <p className="mt-4 text-center text-[10px] text-slate-500 uppercase tracking-widest">Secure 256-bit SSL Encrypted Payment</p>
                   </div>
                </div>
              )}

              {step === 3 && (
                <div className="py-10 text-center space-y-6 animate-scale-in">
                   <div className="h-24 w-24 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                     <HiOutlineCheckCircle className="h-12 w-12" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold text-white">Contribution Successful!</h3>
                     <p className="text-slate-400 mt-2">Thank you for your generous support of ₹{Number(donateAmount).toLocaleString()}.</p>
                   </div>
                   <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-left">
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Instant Receipt</p>
                     <div className="flex justify-between items-center">
                        <span className="text-xs text-white font-medium">Receipt #REC-{Date.now().toString().slice(-6)}</span>
                        <button className="text-[10px] font-bold text-amber-200 uppercase tracking-widest underline">Download PDF</button>
                     </div>
                   </div>
                   <button 
                    onClick={closeDonateModal}
                    className="w-full py-4 rounded-2xl border border-white/10 text-xs font-bold text-white uppercase tracking-widest hover:bg-white/5 transition"
                   >
                     Return to Dashboard
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
        <p className="mt-2 text-slate-400">Manage your CSR contributions and impact reports.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          label="Total Donated" 
          value={`₹${(allDonations.reduce((acc, d) => acc + d.amount, 0)).toLocaleString()}`} 
          icon={HiOutlineCash} 
          trend="+₹2.5L this quarter"
          color="green"
        />
        <StatsCard 
          label="NGOs Supported" 
          value={new Set(allDonations.map(d => d.ngoName)).size} 
          icon={HiOutlineLibrary} 
          color="purple"
        />
        <StatsCard 
          label="Legal Receipts" 
          value={allDonations.length} 
          icon={HiOutlineDocumentText} 
          color="blue"
        />
        <StatsCard 
          label="Social Impact Score" 
          value="8.4/10" 
          icon={HiOutlineTrendingUp} 
          color="amber"
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Funding Opportunities</h2>
            <Link to="/feed" className="text-sm font-bold text-amber-200/80 hover:text-amber-100 uppercase tracking-widest">View All</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 items-start">
            {fundingOpportunities.map(req => (
              <RequestCard key={req.id} request={req} onAction={() => setSelectedRequest(req)} />
            ))}
          </div>

          <div className="space-y-6 pt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Donation History</h2>
              <button className="text-sm font-bold text-amber-200/80 hover:text-amber-100 uppercase tracking-widest">Download All</button>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest text-slate-500">
                  <tr>
                    <th className="px-6 py-4">NGO Name</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {allDonations.length > 0 ? (
                    allDonations.map((donation) => (
                      <tr key={donation.id} className="transition hover:bg-white/[0.02]">
                        <td className="px-6 py-5">
                          <p className="font-bold text-white">{donation.ngoName}</p>
                          <p className="text-[10px] text-slate-500 line-clamp-1">{donation.requestTitle}</p>
                        </td>
                        <td className="px-6 py-5 font-medium text-emerald-400">₹{donation.amount.toLocaleString()}</td>
                        <td className="px-6 py-5 text-slate-500">{donation.date}</td>
                        <td className="px-6 py-5 text-right">
                          <button className="text-[10px] font-bold uppercase tracking-widest text-amber-200/80 hover:text-amber-100 underline underline-offset-4">Receipt</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-10 text-center text-slate-500 italic">No donations yet</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Recommended NGOs</h2>
          <div className="space-y-4">
            {[
              { name: 'Hope Foundation', cause: 'Education', match: '95% Match' },
              { name: 'Sahara Relief Trust', cause: 'Disaster Relief', match: '88% Match' },
            ].map((ngo, i) => (
              <div key={i} className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition hover:border-amber-400/20">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">{ngo.match}</span>
                </div>
                <h4 className="mt-2 text-lg font-bold text-white">{ngo.name}</h4>
                <p className="mt-1 text-sm text-slate-500">{ngo.cause}</p>
                <Link 
                  to="/feed" 
                  className="mt-6 block w-full rounded-2xl bg-white/5 py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition group-hover:bg-amber-400 group-hover:text-slate-950"
                >
                  View Requests
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
