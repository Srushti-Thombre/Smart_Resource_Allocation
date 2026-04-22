import { HiOutlineCash, HiOutlineLibrary, HiOutlineDocumentText, HiOutlineTrendingUp } from 'react-icons/hi';
import StatsCard from '../components/StatsCard';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function CompanyDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
        <p className="mt-2 text-slate-400">Manage your CSR contributions and impact reports.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          label="Total Donated" 
          value={`₹${(user?.totalDonated || 0).toLocaleString()}`} 
          icon={HiOutlineCash} 
          trend="+₹2.5L this quarter"
          color="green"
        />
        <StatsCard 
          label="NGOs Supported" 
          value={user?.ngosSupported || 0} 
          icon={HiOutlineLibrary} 
          color="purple"
        />
        <StatsCard 
          label="Legal Receipts" 
          value={user?.receiptCount || 0} 
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

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
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
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {user?.donationHistory?.map((donation) => (
                  <tr key={donation.id} className="transition hover:bg-white/[0.02]">
                    <td className="px-6 py-5 font-bold text-white">{donation.ngoName}</td>
                    <td className="px-6 py-5 font-medium">₹{donation.amount.toLocaleString()}</td>
                    <td className="px-6 py-5 text-slate-500">{donation.date}</td>
                    <td className="px-6 py-5">
                      <button className="text-[10px] font-bold uppercase tracking-widest text-amber-200/80 hover:text-amber-100 underline underline-offset-4">Receipt</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
