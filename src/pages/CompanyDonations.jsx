import { HiOutlineDownload, HiOutlineChartBar, HiOutlineBadgeCheck } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';

export default function CompanyDonations() {
  const donations = [
    { id: 1, ngo: 'Hope Foundation', amount: '₹2,50,000', date: 'April 15, 2026', status: 'Completed', ref: 'CSR-2026-001' },
    { id: 2, ngo: 'Sahara Relief Trust', amount: '₹1,20,000', date: 'April 12, 2026', status: 'Completed', ref: 'CSR-2026-002' },
    { id: 3, ngo: 'Green Earth Initiative', amount: '₹85,000', date: 'March 25, 2026', status: 'Completed', ref: 'CSR-2026-003' },
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white tracking-tight">CSR Donations</h1>
          <p className="mt-2 text-slate-400">Manage your financial contributions and download tax certificates.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-sm font-bold text-white hover:bg-white/10 transition">
            <HiOutlineDownload className="h-5 w-5" />
            Audit Report
          </button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatsCard label="Total Invested" value="₹4.55L" icon={HiOutlineChartBar} color="amber" />
        <StatsCard label="Verified Receipts" value="3/3" icon={HiOutlineBadgeCheck} color="green" />
        <StatsCard label="Tax Saved (Est)" value="₹1.3L" icon={HiOutlineChartBar} color="blue" />
      </div>

      <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-1 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <th className="px-8 py-6">NGO Partner</th>
                <th className="px-8 py-6">Reference ID</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {donations.map((dn) => (
                <tr key={dn.id} className="hover:bg-white/[0.01] transition">
                  <td className="px-8 py-6">
                    <p className="font-bold text-white">{dn.ngo}</p>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">{dn.status}</p>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500">{dn.ref}</td>
                  <td className="px-8 py-6 font-bold text-amber-400">{dn.amount}</td>
                  <td className="px-8 py-6 text-sm text-slate-500">{dn.date}</td>
                  <td className="px-8 py-6">
                     <button className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/10 border border-white/5 transition">
                        <HiOutlineDownload className="h-4 w-4" />
                        80G Receipt
                     </button>
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
