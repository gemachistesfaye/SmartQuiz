import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, HelpCircle, Info, LogOut, X, Brain, ExternalLink } from 'lucide-react';

function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Help and Support">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card max-w-lg w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2"><HelpCircle size={20} className="text-primary" /> Help & Support</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="space-y-4 text-sm text-gray-300">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="font-bold text-white mb-1">How do quizzes work?</h4>
            <p className="text-xs text-gray-400">Select a category and difficulty, then answer questions. Earn XP for correct answers and build streaks for bonus points.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="font-bold text-white mb-1">What is Code Lab?</h4>
            <p className="text-xs text-gray-400">An in-browser code editor where you can run JavaScript snippets. Try Challenge Mode to work through snippets systematically.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="font-bold text-white mb-1">How does the AI Tutor work?</h4>
            <p className="text-xs text-gray-400">Ask JavaScript questions and get instant answers. Works in Simulation Mode (no API key) or with your own OpenAI key for full power.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5">
            <h4 className="font-bold text-white mb-1">Need more help?</h4>
            <p className="text-xs text-gray-400">Visit our <a href="https://github.com/gemachistesfaye/SmartQuiz-AI-Platform/issues" target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">GitHub Issues <ExternalLink size={10} /></a> to report bugs or request features.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="About SmartQuiz">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card max-w-md w-full p-8 text-center">
        <div className="bg-primary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Brain className="text-primary" size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">SmartQuiz AI Platform</h3>
        <p className="text-xs text-gray-500 mb-6">Version 1.0.0</p>
        <div className="space-y-3 text-left mb-6">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="text-xs text-gray-400">Framework</span>
            <span className="text-xs font-bold text-white">React 19 + Vite</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="text-xs text-gray-400">Backend</span>
            <span className="text-xs font-bold text-white">Firebase</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="text-xs text-gray-400">AI Engine</span>
            <span className="text-xs font-bold text-white">OpenAI GPT-4o-mini</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="text-xs text-gray-400">Quiz Questions</span>
            <span className="text-xs font-bold text-white">210+</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
            <span className="text-xs text-gray-400">Theory Topics</span>
            <span className="text-xs font-bold text-white">82+</span>
          </div>
        </div>
        <button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold transition-all">Close</button>
      </motion.div>
    </div>
  );
}

export default function AvatarMenu() {
  const { userData, currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
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
    <>
      <div className="relative" ref={ref}>
        <button onClick={() => setOpen(!open)} className="flex items-center gap-3 cursor-pointer focus:outline-none min-w-[44px] min-h-[44px] justify-center" aria-label="User menu" aria-expanded={open}>
          <img
            src={`https://ui-avatars.com/api/?name=${userData?.fullName || 'User'}&background=random`}
            alt="Profile"
            className="w-10 h-10 rounded-xl border-2 border-white/10 transition-colors hover:border-primary"
          />
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-2 w-56 z-50">
            <div className="glass-card border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5">
                <p className="text-sm font-bold text-white">{userData?.fullName || 'User'}</p>
                <p className="text-[10px] text-gray-400">{currentUser?.email}</p>
              </div>
              <div className="p-2">
                <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                  <User size={16} /> My Profile
                </Link>
                <Link to="/settings" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                  <Settings size={16} /> Settings
                </Link>
                <button onClick={() => { setOpen(false); setShowHelp(true); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                  <HelpCircle size={16} /> Help & Support
                </button>
                <button onClick={() => { setOpen(false); setShowAbout(true); }} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all">
                  <Info size={16} /> About SmartQuiz
                </button>
              </div>
              <div className="p-2 border-t border-white/5">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-400/10 transition-all">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showHelp && <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />}
        {showAbout && <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />}
      </AnimatePresence>
    </>
  );
}
