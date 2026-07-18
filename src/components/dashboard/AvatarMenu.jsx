import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { User, Settings, HelpCircle, Info, LogOut } from 'lucide-react';

export default function AvatarMenu() {
  const { userData, currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

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
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 cursor-pointer focus:outline-none"
      >
        <img
          src={`https://ui-avatars.com/api/?name=${userData?.fullName || 'User'}&background=random`}
          alt="Profile"
          className="w-10 h-10 rounded-xl border-2 border-white/10 transition-colors hover:border-primary"
        />
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-2 w-56 z-50">
          <div className="glass-card border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
            {/* User info */}
            <div className="px-4 py-3 border-b border-white/5">
              <p className="text-sm font-bold text-white">{userData?.fullName || 'User'}</p>
              <p className="text-[10px] text-gray-500">{currentUser?.email}</p>
            </div>

            {/* Menu items */}
            <div className="p-2">
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <User size={16} /> My Profile
              </Link>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <Settings size={16} /> Settings
              </Link>
              <button
                onClick={() => { setOpen(false); toast.info("Help & Support coming soon!"); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <HelpCircle size={16} /> Help & Support
              </button>
              <button
                onClick={() => { setOpen(false); toast.info("SmartQuiz v1.0 — JavaScript Mastery Platform"); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <Info size={16} /> About SmartQuiz
              </button>
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-white/5">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-400/10 transition-all"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
