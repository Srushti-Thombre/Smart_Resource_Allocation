import { HiOutlineBell, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineGift, HiOutlineInformationCircle } from 'react-icons/hi';
import { mockNotifications } from '../data/mockData';

export default function NotificationPanel() {
  const iconMap = {
    opportunity: { icon: HiOutlineInformationCircle, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    urgent: { icon: HiOutlineExclamationCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
    donation: { icon: HiOutlineGift, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    certificate: { icon: HiOutlineCheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    update: { icon: HiOutlineInformationCircle, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  };

  return (
    <div className="w-80 rounded-[2rem] border border-white/10 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between px-2">
        <h3 className="text-sm font-bold text-white">Notifications</h3>
        <button className="text-[10px] font-bold uppercase tracking-widest text-amber-200 hover:text-amber-100">
          Mark all as read
        </button>
      </div>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {mockNotifications.map((notification) => {
          const config = iconMap[notification.type] || iconMap.update;
          const Icon = config.icon;
          
          return (
            <div 
              key={notification.id}
              className={`flex gap-3 rounded-2xl p-3 transition hover:bg-white/5 ${!notification.read ? 'bg-white/[0.03]' : ''}`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${config.bg} ${config.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white leading-tight">{notification.title}</p>
                <p className="mt-1 text-[11px] text-slate-400 leading-normal line-clamp-2">{notification.message}</p>
                <p className="mt-1.5 text-[9px] font-medium text-slate-500 uppercase tracking-tighter">{notification.time}</p>
              </div>
              {!notification.read && (
                <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400 mt-1" />
              )}
            </div>
          );
        })}
      </div>
      
      <button className="mt-4 w-full rounded-xl py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white transition">
        View all notifications
      </button>
    </div>
  );
}
