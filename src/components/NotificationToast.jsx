import { useAuth } from '../context/AuthContext';
import { HiOutlineBell, HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineX } from 'react-icons/hi';

export default function NotificationToast() {
  const { notifications } = useAuth();

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col gap-3 pointer-events-none">
      {notifications.map((notif) => (
        <div 
          key={notif.id} 
          className="pointer-events-auto w-80 animate-bounce-in overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 p-5 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
              notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 
              notif.type === 'error' ? 'bg-red-500/10 text-red-400' : 
              'bg-blue-500/10 text-blue-400'
            }`}>
              {notif.type === 'success' ? <HiOutlineCheckCircle className="h-6 w-6" /> : 
               notif.type === 'error' ? <HiOutlineExclamationCircle className="h-6 w-6" /> : 
               <HiOutlineBell className="h-6 w-6" />}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-white tracking-tight">{notif.title}</h4>
              <p className="mt-1 text-xs leading-relaxed text-slate-400">{notif.message}</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/5">
            <div className={`h-full transition-all duration-5000 ease-linear ${
              notif.type === 'success' ? 'bg-emerald-500' : 
              notif.type === 'error' ? 'bg-red-500' : 
              'bg-blue-500'
            }`} style={{ width: '0%', animation: 'progress 5s linear forwards' }} />
          </div>
        </div>
      ))}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}} />
    </div>
  );
}
