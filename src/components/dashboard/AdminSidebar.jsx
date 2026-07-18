import {
  BarChart3, 
  Users, 
  Database, 
  ClipboardList, 
  Settings, 
  LogOut,
  Brain,
  ShieldAlert,
  Activity
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const adminItems = [
  { icon: <BarChart3 size={20} />, label: 'Admin Dashboard', path: '/admin/dashboard' },
  { icon: <Users size={20} />, label: 'Manage Users', path: '/admin/users' },
  { icon: <Database size={20} />, label: 'Manage Questions', path: '/admin/questions' },
];

const studentTools = [
  { icon: <Brain size={20} />, label: 'AI Assistant', path: '/ai-assistant' },
  { icon: <ShieldAlert size={20} />, label: 'Cybersecurity', path: '/cybersecurity' },
  { icon: <ClipboardList size={20} />, label: 'Theory Vault', path: '/theory' },
];

export default function AdminSidebar() {
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
    <aside className="w-64 glass-card h-[calc(100vh-2rem)] sticky top-4 left-4 flex flex-col p-6 hidden lg:flex border-r border-red-500/10">
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-red-500/20 p-2 rounded-xl">
          <ShieldAlert className="w-6 h-6 text-red-500" />
        </div>
        <span className="text-xl font-bold tracking-tighter text-white">Smart<span className="text-red-500">Admin</span></span>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto custom-scrollbar">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 px-4">Admin Console</div>
        {adminItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              location.pathname === item.path 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}

        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-8 mb-4 px-4">Learning Tools</div>
        {studentTools.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              location.pathname === item.path 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="font-medium text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-6 p-4 rounded-2xl bg-red-500/5 border border-red-500/10 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Activity size={14} className="text-red-400" />
          <span className="text-[10px] font-bold text-red-400 uppercase">System Health</span>
        </div>
        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-2">
          <div className="bg-green-500 w-full h-full" />
        </div>
        <p className="text-[9px] text-gray-500 mt-2">All services operational</p>
      </div>

      <div className="pt-6 border-t border-white/10 space-y-2">
        <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <Settings size={20} />
          <span className="font-medium text-sm">System Settings</span>
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
