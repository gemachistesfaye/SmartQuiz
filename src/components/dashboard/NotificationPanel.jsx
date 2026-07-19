import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Trophy, Target, Zap, Check } from 'lucide-react';

const DEFAULT_NOTIFICATIONS = [
  { id: 1, type: 'achievement', title: 'Welcome to SmartQuiz!', message: 'Start your first quiz to earn XP.', time: 'Just now', read: false, icon: Trophy, color: 'text-yellow-400' },
  { id: 2, type: 'tip', title: 'Daily Tip', message: 'Use console.table() for better debugging.', time: '1h ago', read: false, icon: Target, color: 'text-blue-400' },
  { id: 3, type: 'streak', title: 'Keep your streak!', message: 'Complete a quiz today to maintain your streak.', time: '3h ago', read: true, icon: Zap, color: 'text-orange-400' },
];

export default function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('sq_notifications');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });
  const ref = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('sq_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const markAllRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      localStorage.setItem('sq_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem('sq_notifications', JSON.stringify([]));
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors relative min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
        aria-expanded={open}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[8px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full right-0 mt-2 w-80 z-50"
          >
            <div className="glass-card border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button onClick={markAllRead} className="text-[10px] text-primary hover:underline font-bold">Mark all read</button>
                  )}
                  <button onClick={clearAll} className="text-[10px] text-gray-500 hover:text-red-400 font-bold">Clear</button>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell size={24} className="text-gray-700 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">No notifications</p>
                  </div>
                ) : (
                  notifications.map(n => {
                    const Icon = n.icon || Bell;
                    return (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`px-4 py-3 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-all flex items-start gap-3 ${
                          !n.read ? 'bg-primary/5' : ''
                        }`}
                      >
                        <div className={`p-2 rounded-lg bg-white/5 shrink-0 ${n.color}`}>
                          <Icon size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-white truncate">{n.title}</p>
                            {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                          </div>
                          <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">{n.message}</p>
                          <p className="text-[10px] text-gray-500 mt-1">{n.time}</p>
                        </div>
                        {!n.read && (
                          <button onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }} className="text-gray-600 hover:text-white shrink-0 mt-1">
                            <Check size={12} />
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
