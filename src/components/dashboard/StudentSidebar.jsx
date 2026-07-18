import {
  LayoutDashboard, 
  Brain, 
  Code, 
  Trophy, 
  BookOpen, 
  Settings, 
  LogOut,
  Sparkles,
  Zap,
  ShieldCheck,
  BarChart3
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const studentItems = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
  { icon: <Zap size={20} />, label: 'Quiz Arena', path: '/quiz' },
  { icon: <Code size={20} />, label: 'Code Lab', path: '/codelab' },
  { icon: <Sparkles size={20} />, label: 'AI Assistant', path: '/ai-assistant' },
  { icon: <BookOpen size={20} />, label: 'Theory Vault', path: '/theory' },
  { icon: <ShieldCheck size={20} />, label: 'Cybersecurity', path: '/cybersecurity' },
  { icon: <BarChart3 size={20} />, label: 'Analytics', path: '/analytics' },
  { icon: <Trophy size={20} />, label: 'Leaderboard', path: '/leaderboard' },
];

export default function StudentSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate('/login');
    } catch {
      toast.error("Failed to log out");
    }
  };

  return (
    <aside className="w-64 glass-card h-[calc(100vh-2rem)] sticky top-4 left-4 flex flex-col p-6 hidden lg:flex border-r border-white/5">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-primary/20 p-2 rounded-xl">
          <Brain className="w-6 h-6 text-primary" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">Smart<span className="text-gradient">Quiz</span></span>
      </div>

      <nav className="flex-1 space-y-2">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-4">Student Menu</div>
        {studentItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              location.pathname === item.path 
                ? 'bg-primary text-white shadow-lg shadow-primary/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/5 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold text-primary uppercase">Pro Status</span>
        </div>
        <p className="text-[10px] text-gray-400 leading-relaxed">Unlock advanced AI features and marathon mode.</p>
      </div>

      <div className="pt-6 border-t border-white/10 space-y-2">
        <Link to="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <Settings size={20} />
          <span className="font-medium text-sm">Settings</span>
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all"
        >
          <LogOut size={20} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
