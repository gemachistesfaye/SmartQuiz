import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, BookOpen, Zap, Code, Sparkles, BarChart3, 
  Trophy, Settings, LogOut, X, Brain, Shield, ChevronRight
} from 'lucide-react';

const studentLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Zap, label: 'Quiz', path: '/quiz' },
  { icon: BookOpen, label: 'Theory Vault', path: '/theory' },
  { icon: Code, label: 'Code Lab', path: '/codelab' },
  { icon: Sparkles, label: 'AI Assistant', path: '/ai-assistant' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const adminLinks = [
  { icon: Shield, label: 'Admin Panel', path: '/admin' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function MobileSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { currentUser, userData, isAdmin, logout } = useAuth();
  const links = isAdmin ? adminLinks : studentLinks;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-[#0d0d0d] border-r border-white/10 z-[70] lg:hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center justify-between mb-5">
                <Link to="/dashboard" className="flex items-center gap-2.5">
                  <div className="bg-primary/20 p-2 rounded-xl">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-lg font-bold text-white">Smart<span className="text-primary">Quiz</span></span>
                </Link>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/10 text-gray-400" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              {currentUser && (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${userData?.fullName || 'User'}&background=random`} 
                    alt="" 
                    className="w-9 h-9 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{userData?.fullName || 'Learner'}</p>
                    <p className="text-[10px] text-gray-500 truncate">@{userData?.username || 'learner'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {links.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary/15 text-primary'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="flex-1">{item.label}</span>
                    {isActive && <ChevronRight size={16} className="text-primary" />}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-white/10">
              <button
                onClick={async () => {
                  await logout();
                  window.location.href = '/';
                }}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
