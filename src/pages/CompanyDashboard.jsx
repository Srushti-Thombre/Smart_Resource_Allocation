import { useState, useEffect } from 'react';
import { HiOutlineCash, HiOutlineHeart, HiOutlineClipboard, HiOutlineStar, HiOutlineX } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';

const API_BASE_URL = 'http://localhost:5000/api';
const COMPANY_NAME = 'ABC Corp';

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [fundingRequests, setFundingRequests] = useState([]);
  const [donationHistory, setDonationHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [step, setStep] = useState(1);
  const [donateAmount, setDonateAmount] = useState(50000);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');

  // Fetch funding requests and donations on mount
  useEffect(() => {
    fetchFundingRequests();
    fetchDonationHistory();
  }, []);

  const fetchFundingRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/requests?type=funding`);
      const data = await response.json();
      setFundingRequests(data.data || []);
    } catch (error) {
      console.error('Error fetching funding requests:', error);
      setMessage({ type: 'error', text: 'Failed to load funding requests' });
    } finally {
      setLoading(false);
    }
  };

  const fetchDonationHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/donate?companyName=${COMPANY_NAME}`);
      const data = await response.json();
      setDonationHistory(data.data || []);
    } catch (error) {
      console.error('Error fetching donation history:', error);
    }
  };

  const openDonateModal = (request) => {
    setSelectedRequest(request);
    setShowDonateModal(true);
    setStep(1);
    setDonateAmount(50000);
    setPaymentMethod('credit_card');
  };

  const handleDonate = async () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/donate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: COMPANY_NAME,
          ngoName: selectedRequest.ngoName,
          amount: donateAmount,
          requestId: selectedRequest.id,
          paymentMethod: paymentMethod
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Donation processed successfully! Thank you for your support.' });
        setShowDonateModal(false);
        setStep(1);
        // Refresh donations and requests
        fetchDonationHistory();
        fetchFundingRequests();
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to process donation' });
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const closeDonateModal = () => {
    setShowDonateModal(false);
    setSelectedRequest(null);
    setStep(1);
  };

  const totalDonated = donationHistory.reduce((sum, d) => sum + d.amount, 0);

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

      {/* Donation Modal */}
      {showDonateModal && selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Donate to {selectedRequest.ngoName}</h2>
              <button 
                onClick={closeDonateModal}
                className="rounded-xl p-2 hover:bg-white/10"
              >
                <HiOutlineX className="h-6 w-6 text-slate-400" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {/* Step Indicator */}
              <div className="flex justify-between mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`h-1 flex-1 mx-1 rounded-full ${s <= step ? 'bg-amber-400' : 'bg-white/10'}`} />
                ))}
              </div>

              {/* Step 1: Amount Selection */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white mb-4">Select Donation Amount</h3>
                  <div className="space-y-3">
                    {[50000, 100000, 500000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setDonateAmount(amount)}
                        className={`w-full rounded-2xl border-2 p-4 text-left font-bold uppercase tracking-widest transition ${
                          donateAmount === amount
                            ? 'border-amber-400 bg-amber-400/10 text-amber-300'
                            : 'border-white/10 bg-white/5 text-white hover:border-white/20'
                        }`}
                      >
                        ₹{amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Or Enter Custom Amount</label>
                    <input
                      type="number"
                      value={donateAmount}
                      onChange={(e) => setDonateAmount(parseInt(e.target.value) || 0)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-amber-400/30 focus:bg-white/10"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white mb-4">Select Payment Method</h3>
                  <div className="space-y-3">
                    {['credit_card', 'bank_transfer', 'csr_wallet'].map((method) => (
                      <label
                        key={method}
                        className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition ${
                          paymentMethod === method
                            ? 'border-amber-400 bg-amber-400/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method}
                          checked={paymentMethod === method}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-sm font-bold text-white uppercase tracking-widest">
                          {method === 'credit_card' ? 'Credit Card' : method === 'bank_transfer' ? 'Bank Transfer' : 'CSR Wallet'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white mb-4">Confirm Donation</h3>
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">NGO Name:</span>
                      <span className="font-bold text-white">{selectedRequest.ngoName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Amount:</span>
                      <span className="font-bold text-amber-400">₹{donateAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-white/10 pt-3">
                      <span className="text-slate-400">Payment Method:</span>
                      <span className="font-bold text-white">
                        {paymentMethod === 'credit_card' ? 'Credit Card' : paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'CSR Wallet'}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
                    <p className="text-sm text-emerald-300">✓ Your donation will be processed and a tax receipt will be generated.</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 pt-4">
                {step > 1 && (
                  <button 
                    onClick={() => setStep(step - 1)}
                    disabled={isProcessing}
                    className="flex-1 rounded-2xl border border-white/10 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/5 transition disabled:opacity-50"
                  >
                    Back
                  </button>
                )}
                <button 
                  onClick={closeDonateModal}
                  disabled={isProcessing}
                  className="flex-1 rounded-2xl border border-white/10 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-white/5 transition disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDonate}
                  disabled={isProcessing || donateAmount <= 0}
                  className="flex-1 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-bold uppercase tracking-widest text-slate-950 shadow-lg shadow-amber-500/20 hover:shadow-xl transition disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : step === 3 ? 'Confirm Donation' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Card */}
      <div className="rounded-3xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-emerald-500/20 p-8 shadow-lg shadow-emerald-500/10">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome, {COMPANY_NAME}! 💼</h1>
        <p className="text-slate-300">Make a lasting impact through strategic donations and CSR initiatives.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          label="Total Donated" 
          value={`₹${(totalDonated / 100000).toFixed(1)}L`}
          icon={HiOutlineCash} 
          trend="+₹50K this month"
          color="amber"
        />
        <StatsCard 
          label="NGOs Supported" 
          value={new Set(donationHistory.map(d => d.ngoName)).size} 
          icon={HiOutlineHeart} 
          color="emerald"
        />
        <StatsCard 
          label="Tax Receipts" 
          value={donationHistory.length} 
          icon={HiOutlineClipboard} 
          color="blue"
        />
        <StatsCard 
          label="Impact Score" 
          value="9.2/10" 
          icon={HiOutlineStar} 
          trend="Excellent"
          color="purple"
        />
      </div>

      {/* Funding Requests Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Funding Requests ({fundingRequests.length})</h2>
          <button 
            onClick={fetchFundingRequests}
            className="text-sm font-bold text-amber-200/80 hover:text-amber-100 uppercase tracking-widest"
          >
            Refresh →
          </button>
        </div>
        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-slate-400">Loading funding requests...</p>
          </div>
        ) : fundingRequests.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/20 bg-white/5 p-12 text-center">
            <p className="text-slate-400">No funding requests available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {fundingRequests.map((request) => {
              const progressPercent = request.amountNeeded > 0 ? Math.min((request.amountNeeded * 0.6) / request.amountNeeded * 100, 100) : 0;
              return (
                <div key={request.id} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/[0.08] hover:border-white/20 transition-all shadow-lg hover:shadow-xl">
                  <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-b border-white/10 p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{request.title}</h3>
                    <p className="text-sm text-amber-200 font-medium">{request.ngoName}</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <p className="text-sm text-slate-300">{request.description.substring(0, 100)}...</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Amount Needed</span>
                        <span className="font-bold text-amber-400">₹{request.amountNeeded.toLocaleString()}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>₹{(request.amountNeeded * 0.6).toLocaleString()} raised</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => openDonateModal(request)}
                      className="w-full rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:shadow-xl transition"
                    >
                      Donate Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Donation History */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Donation History</h2>
        <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 bg-gradient-to-br from-emerald-600/10 to-teal-600/10 border-b border-white/10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-2">Total Donations</p>
              <p className="text-3xl font-bold text-white">₹{(totalDonated / 100000).toFixed(1)}L</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-2">Transactions</p>
              <p className="text-3xl font-bold text-white">{donationHistory.length}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-2">Avg. Donation</p>
              <p className="text-3xl font-bold text-white">₹{donationHistory.length > 0 ? (totalDonated / donationHistory.length / 100000).toFixed(1) : '0'}L</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-200 mb-2">NGOs Helped</p>
              <p className="text-3xl font-bold text-white">{new Set(donationHistory.map(d => d.ngoName)).size}</p>
            </div>
          </div>

          {donationHistory.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              <p>No donations yet. Start making an impact today!</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {donationHistory.map((donation) => (
                <div key={donation._id} className="flex items-center justify-between p-6 hover:bg-white/[0.02] transition">
                  <div>
                    <p className="text-sm font-bold text-white">{donation.ngoName}</p>
                    <p className="text-xs text-slate-400 mt-1">{new Date(donation.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="text-lg font-bold text-emerald-400">₹{donation.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
