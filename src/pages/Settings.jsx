import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import DashboardLayout from '../layouts/DashboardLayout';
import { Settings as SettingsIcon, Bell, Moon, Shield, Save, RotateCcw } from 'lucide-react';

const DEFAULT_SETTINGS = {
  notifications: true,
  emailUpdates: false,
  darkMode: true,
  soundEffects: true,
  difficulty: 'all',
};

function Toggle({ label, description, value, onChange }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
      <div>
        <p className="text-sm font-bold text-white">{label}</p>
        <p className="text-[10px] text-gray-500 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition-colors relative ${value ? 'bg-primary' : 'bg-white/10'}`}
      >
        <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${value ? 'left-6' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

export default function Settings() {
  const { currentUser, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    if (!currentUser) return;
    const fetchSettings = async () => {
      try {
        const docSnap = await getDoc(doc(db, "users", currentUser.uid));
        if (docSnap.exists() && docSnap.data().settings) {
          const s = docSnap.data().settings;
          setSettings({
            notifications: s.notifications ?? DEFAULT_SETTINGS.notifications,
            emailUpdates: s.emailUpdates ?? DEFAULT_SETTINGS.emailUpdates,
            darkMode: s.darkMode ?? DEFAULT_SETTINGS.darkMode,
            soundEffects: s.soundEffects ?? DEFAULT_SETTINGS.soundEffects,
            difficulty: s.difficulty ?? DEFAULT_SETTINGS.difficulty,
          });
        }
      } catch (err) {
        console.error("Failed to load settings:", err);
      }
    };
    fetchSettings();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;
    try {
      setLoading(true);
      await updateDoc(doc(db, "users", currentUser.uid), { settings });
      toast.success("Settings saved!");
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!currentUser?.email) return;
    try {
      await resetPassword(currentUser.email);
      toast.success("Password reset email sent!");
    } catch (err) {
      console.error("Reset error:", err);
      toast.error("Failed to send reset email");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto px-6 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <SettingsIcon className="text-primary" size={32} /> Settings
          </h1>
          <p className="text-gray-400 mb-8">Manage your preferences and account settings.</p>
        </motion.div>

        <div className="space-y-6">
          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
              <Bell size={16} className="text-primary" /> Notifications
            </h3>
            <div className="space-y-3">
              <Toggle label="Push Notifications" description="Get notified about new quizzes and achievements" value={settings.notifications} onChange={(v) => setSettings({...settings, notifications: v})} />
              <Toggle label="Email Updates" description="Receive weekly progress reports via email" value={settings.emailUpdates} onChange={(v) => setSettings({...settings, emailUpdates: v})} />
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
              <Moon size={16} className="text-primary" /> Appearance
            </h3>
            <div className="space-y-3">
              <Toggle label="Dark Mode" description="Use dark theme (recommended)" value={settings.darkMode} onChange={(v) => setSettings({...settings, darkMode: v})} />
              <Toggle label="Sound Effects" description="Play sounds for correct/wrong answers" value={settings.soundEffects} onChange={(v) => setSettings({...settings, soundEffects: v})} />
            </div>
          </motion.div>

          {/* Quiz Defaults */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
              <RotateCcw size={16} className="text-primary" /> Quiz Defaults
            </h3>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-sm font-bold text-white mb-1">Default Difficulty</p>
              <p className="text-[10px] text-gray-500 mb-3">Applied when starting a new quiz</p>
              <div className="flex gap-2">
                {['all', 'easy', 'medium', 'hard'].map(d => (
                  <button
                    key={d}
                    onClick={() => setSettings({...settings, difficulty: d})}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      settings.difficulty === d ? 'bg-primary text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {d === 'all' ? 'All' : d.charAt(0).toUpperCase() + d.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Account */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
              <Shield size={16} className="text-primary" /> Account
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Email</p>
                  <p className="text-[10px] text-gray-500">{currentUser?.email}</p>
                </div>
                <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">Verified</span>
              </div>
              <button onClick={handleResetPassword} className="w-full p-4 rounded-xl bg-white/5 border border-white/5 text-left hover:bg-white/10 transition-all">
                <p className="text-sm font-bold text-white">Change Password</p>
                <p className="text-[10px] text-gray-500">A reset link will be sent to your email</p>
              </button>
            </div>
          </motion.div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save size={18} />
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
