import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HiOutlineViewGrid, 
  HiOutlineClipboardList, 
  HiOutlineUserGroup, 
  HiOutlineLibrary, 
  HiOutlineCash, 
  HiOutlineBell,
  HiOutlineUserCircle,
  HiOutlineLogout,
  HiOutlineSparkles,
  HiOutlineSearchCircle
} from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = {
    volunteer: [
      { name: 'Dashboard', path: '/volunteer-dashboard', icon: HiOutlineViewGrid },
      { name: 'Browse Requests', path: '/feed', icon: HiOutlineClipboardList },
      { name: 'My Tasks', path: '/tasks', icon: HiOutlineUserGroup },
      { name: 'Certificates', path: '/certificates', icon: HiOutlineLibrary },
    ],
    ngo: [
      { name: 'Dashboard', path: '/ngo-dashboard', icon: HiOutlineViewGrid },
      { name: 'My Requests', path: '/ngo-requests', icon: HiOutlineClipboardList },
      { name: 'Volunteers', path: '/ngo-volunteers', icon: HiOutlineUserGroup },
      { name: 'Donations', path: '/ngo-donations', icon: HiOutlineCash },
    ],
    company: [
      { name: 'Dashboard', path: '/company-dashboard', icon: HiOutlineViewGrid },
      { name: 'Impact Feed', path: '/impact-feed', icon: HiOutlineSparkles },
      { name: 'NGO Directory', path: '/ngo-directory', icon: HiOutlineSearchCircle },
      { name: 'Donations', path: '/company-donations', icon: HiOutlineCash },
    ],
  };

  const currentMenu = menuItems[user?.role] || [];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-slate-950/80 backdrop-blur-xl transition-transform lg:translate-x-0">
      <div className="flex h-full flex-col px-4 py-6">
        <Link to="/" className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#f59e0b]/80 shadow-glow">
            <span className="text-lg">⛓️</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">ImpactBridge</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-amber-400/10 text-amber-200 shadow-sm' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-amber-200' : 'text-slate-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-1 pt-4 border-t border-white/10">
          <Link
            to="/profile"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <HiOutlineUserCircle className="h-5 w-5 text-slate-500" />
            Profile Settings
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-400/80 transition hover:bg-red-400/5 hover:text-red-400"
          >
            <HiOutlineLogout className="h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
