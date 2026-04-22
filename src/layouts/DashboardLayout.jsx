import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { HiOutlineBell, HiOutlineSearch, HiOutlineMenuAlt2 } from 'react-icons/hi';
import NotificationPanel from '../components/NotificationPanel';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#05122f] text-slate-100">
      <Sidebar />

      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/5 bg-slate-950/40 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <button className="rounded-xl p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden">
              <HiOutlineMenuAlt2 className="h-6 w-6" />
            </button>
            <div className="relative hidden sm:block">
              <HiOutlineSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search resources, NGOs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-80 rounded-2xl border border-white/5 bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-amber-300/30 focus:bg-white/10"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-2xl border border-white/5 bg-white/5 p-2.5 text-slate-400 transition hover:border-white/10 hover:bg-white/10"
              >
                <HiOutlineBell className="h-5 w-5" />
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber-400 border-2 border-slate-950"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-4 animate-fade-in">
                  <NotificationPanel />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 border-l border-white/10 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">{user?.name}</p>
                <p className="text-[10px] font-medium uppercase tracking-widest text-amber-200/80">{user?.role}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#f59e0b]/80 text-sm font-bold text-white shadow-glow">
                {user?.avatar || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-8">
          <Outlet context={{ searchTerm, setSearchTerm }} />
        </main>
      </div>
    </div>
  );
}
