import { LayoutDashboard, Zap, Code, Sparkles, Trophy } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
  { icon: Zap, label: 'Quiz', path: '/quiz' },
  { icon: Code, label: 'Code', path: '/codelab' },
  { icon: Sparkles, label: 'AI', path: '/ai-assistant' },
  { icon: Trophy, label: 'Ranks', path: '/leaderboard' },
];

export default function MobileNav() {
  const location = useLocation();
  const { isAdmin } = useAuth();

  if (isAdmin) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 px-2 py-2 safe-area-inset">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[56px] ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon size={20} />
              <span className="text-[9px] font-bold uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
