import { LayoutDashboard, BookOpen, Zap, Code, Sparkles, BarChart3, Brain } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const sections = [
  {
    label: 'Learning',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
      { icon: BookOpen, label: 'Theory Vault', path: '/theory' },
      { icon: Zap, label: 'Quiz Arena', path: '/quiz' },
      { icon: Code, label: 'Code Lab', path: '/codelab' },
    ],
  },
  {
    label: 'AI',
    items: [
      { icon: Sparkles, label: 'AI Tutor', path: '/ai-assistant' },
    ],
  },
  {
    label: 'Progress',
    items: [
      { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    ],
  },
];

export default function StudentSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 glass-card h-[calc(100vh-2rem)] sticky top-4 left-4 flex flex-col p-6 hidden lg:flex border-r border-white/5">
      <Link to="/dashboard" className="flex items-center gap-3 mb-10">
        <div className="bg-primary/20 p-2 rounded-xl">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">Smart<span className="text-gradient">Quiz</span></span>
      </Link>

      <nav className="flex-1 space-y-6">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-4">{section.label}</div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
