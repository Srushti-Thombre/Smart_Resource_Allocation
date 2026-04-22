import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlineShieldCheck, HiOutlineCreditCard } from 'react-icons/hi';

const amounts = [500, 1000, 2000, 5000, 10000];

export default function DonationPage() {
  const [amount, setAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleDonate = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Thank you for your donation! A receipt has been sent to your email.');
      navigate(-1);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-10 pb-20">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white transition"
      >
        <HiOutlineArrowLeft className="h-5 w-5" />
        Back
      </button>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">Make a Difference</h1>
        <p className="mt-2 text-slate-400">Your contribution directly supports verified social impact initiatives.</p>
      </div>

      <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-10 backdrop-blur-xl shadow-2xl">
        <div className="space-y-10">
          {/* Amount Selection */}
          <div className="space-y-6">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 text-center block">Select Amount (₹)</label>
            <div className="grid grid-cols-3 gap-4">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => { setAmount(amt); setCustomAmount(''); }}
                  className={`rounded-2xl border py-4 text-sm font-bold transition ${
                    amount === amt && !customAmount
                      ? 'bg-amber-400/10 text-amber-200 border-amber-400/30 shadow-glow'
                      : 'bg-white/5 text-slate-400 border-transparent hover:bg-white/10'
                  }`}
                >
                  ₹{amt.toLocaleString()}
                </button>
              ))}
              <div className="relative">
                <input
                  type="number"
                  placeholder="Custom"
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setAmount(0); }}
                  className="w-full h-full rounded-2xl border border-white/10 bg-white/5 px-4 text-center text-sm font-bold text-white outline-none focus:border-amber-300/30"
                />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5">
            <div className="rounded-[1.5rem] bg-white/5 p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Selected Amount</span>
                <span className="font-bold text-white">₹{(customAmount || amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Platform Fee</span>
                <span className="text-emerald-400 font-bold">₹0 (Free)</span>
              </div>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-base font-bold text-white">Total Contribution</span>
                <span className="text-2xl font-bold text-amber-400">₹{(customAmount || amount).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-3 justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <HiOutlineShieldCheck className="h-4 w-4 text-emerald-400" />
                Secure 256-bit Encrypted Payment
             </div>
             <button
                disabled={isProcessing}
                onClick={handleDonate}
                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 py-5 text-sm font-bold text-slate-950 transition hover:shadow-lg hover:shadow-amber-500/30 disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : (
                  <>
                    <HiOutlineCreditCard className="h-5 w-5" />
                    Complete Donation
                  </>
                )}
              </button>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-xs text-slate-500">
          By donating, you agree to our Terms of Service and Privacy Policy. <br/>
          All donations are eligible for tax benefits under Section 80G.
        </p>
      </div>
    </div>
  );
}
