import { HiOutlineDownload, HiOutlineTrendingUp, HiOutlineCurrencyRupee } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';

export default function NGODonations() {
  const transactions = [
    { id: 1, donor: 'Reliance CSR', amount: '₹2,50,000', project: 'Scholarship Fund', date: 'April 15, 2026', method: 'Bank Transfer' },
    { id: 2, donor: 'Amit Verma', amount: '₹5,000', project: 'Scholarship Fund', date: 'April 14, 2026', method: 'UPI' },
    { id: 3, donor: 'Tech Mahindra', amount: '₹1,20,000', project: 'Teaching Volunteers', date: 'April 12, 2026', method: 'Corporate CSR' },
    { id: 4, donor: 'Sneha Rao', amount: '₹1,000', project: 'General Fund', date: 'April 10, 2026', method: 'Card' },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">Donations & Funding</h1>
          <p className="mt-2 text-slate-400">Monitor financial contributions and download tax receipts.</p>
        </div>
        <button className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-sm font-bold text-white hover:bg-white/10 transition">
          <HiOutlineDownload className="h-5 w-5" />
          Export Statement
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard label="Total Received" value="₹18.5L" icon={HiOutlineCurrencyRupee} color="green" />
        <StatsCard label="Active Campaigns" value="3" icon={HiOutlineTrendingUp} color="amber" />
        <StatsCard label="Individual Donors" value="128" icon={HiOutlineCurrencyRupee} color="blue" />
      </div>

      <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-1 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <th className="px-8 py-6">Donor</th>
                <th className="px-8 py-6">Project</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/[0.01] transition">
                  <td className="px-8 py-6 font-bold text-white">{tx.donor}</td>
                  <td className="px-8 py-6 text-sm text-slate-400">{tx.project}</td>
                  <td className="px-8 py-6 font-bold text-emerald-400">{tx.amount}</td>
                  <td className="px-8 py-6 text-sm text-slate-500">{tx.date}</td>
                  <td className="px-8 py-6">
                     <span className="rounded-lg bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 border border-white/5">
                        {tx.method}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
