import { LayoutDashboard, BookOpen, Zap, Code, Sparkles, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
  { icon: BookOpen, label: 'Learn', path: '/theory' },
  { icon: Zap, label: 'Quiz', path: '/quiz' },
  { icon: Code, label: 'Code', path: '/codelab' },
  { icon: Sparkles, label: 'AI', path: '/ai-assistant' },
  { icon: BarChart3, label: 'Stats', path: '/analytics' },
];

export default function MobileNav() {
  const location = useLocation();
  const { isAdmin } = useAuth();

  if (isAdmin) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 px-1 py-1 pb-safe" role="navigation" aria-label="Mobile navigation">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              aria-label={item.label}
              className={`flex flex-col items-center gap-1 px-3 py-2 min-w-[48px] min-h-[48px] justify-center rounded-xl transition-all ${
                isActive
                  ? 'text-primary bg-primary/20'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-semibold uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
