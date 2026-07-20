import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
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
        <p className="text-[10px] text-gray-400 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        role="switch"
        aria-checked={value}
        aria-label={label}
        className={`w-12 h-6 rounded-full transition-colors relative min-h-[24px] ${value ? 'bg-primary' : 'bg-white/10'}`}
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
  const [lastSavedSettings, setLastSavedSettings] = useState(DEFAULT_SETTINGS);

  useEffect(() => {
    if (!currentUser) return;

    // Use real-time listener for settings to prevent race conditions
    const unsubscribe = onSnapshot(
      doc(db, 'users', currentUser.uid),
      (docSnap) => {
        if (docSnap.exists() && docSnap.data().settings) {
          const s = docSnap.data().settings;
          const loadedSettings = {
            notifications: s.notifications ?? DEFAULT_SETTINGS.notifications,
            emailUpdates: s.emailUpdates ?? DEFAULT_SETTINGS.emailUpdates,
            darkMode: s.darkMode ?? DEFAULT_SETTINGS.darkMode,
            soundEffects: s.soundEffects ?? DEFAULT_SETTINGS.soundEffects,
            difficulty: s.difficulty ?? DEFAULT_SETTINGS.difficulty,
          };
          setSettings(loadedSettings);
          setLastSavedSettings(loadedSettings);
        }
      },
      (error) => {
        console.error('Settings listener error:', error);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;

    // Check if settings actually changed
    const hasChanges = JSON.stringify(settings) !== JSON.stringify(lastSavedSettings);
    if (!hasChanges) {
      toast.info('No changes to save');
      return;
    }

    try {
      setLoading(true);
      // Use merge: true to prevent overwriting other user fields
      await updateDoc(doc(db, 'users', currentUser.uid), {
        settings: { ...settings }
      });
      setLastSavedSettings(settings);
      toast.success('Settings saved!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!currentUser?.email) return;
    try {
      await resetPassword(currentUser.email);
      toast.success('Password reset email sent!');
    } catch (err) {
      console.error('Reset error:', err);
      toast.error('Failed to send reset email');
    }
  };

  const hasChanges = JSON.stringify(settings) !== JSON.stringify(lastSavedSettings);

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto px-4 md:px-6 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <SettingsIcon className="text-primary" size={28} /> Settings
          </h1>
          <p className="text-gray-400 mb-5 md:mb-8 text-sm">Manage your preferences and account settings.</p>
        </motion.div>

        <div className="space-y-3 md:space-y-6">
          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-4 md:p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
              <Bell size={16} className="text-primary" /> Notifications
            </h3>
            <div className="space-y-3">
              <Toggle label="Push Notifications" description="Get notified about new quizzes and achievements" value={settings.notifications} onChange={(v) => setSettings({...settings, notifications: v})} />
              <Toggle label="Email Updates" description="Receive weekly progress reports via email" value={settings.emailUpdates} onChange={(v) => setSettings({...settings, emailUpdates: v})} />
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-card p-4 md:p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
              <Moon size={16} className="text-primary" /> Appearance
            </h3>
            <div className="space-y-3">
              <Toggle label="Dark Mode" description="Use dark theme (recommended)" value={settings.darkMode} onChange={(v) => setSettings({...settings, darkMode: v})} />
              <Toggle label="Sound Effects" description="Play sounds for correct/wrong answers" value={settings.soundEffects} onChange={(v) => setSettings({...settings, soundEffects: v})} />
            </div>
          </motion.div>

          {/* Quiz Defaults */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-4 md:p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
              <RotateCcw size={16} className="text-primary" /> Quiz Defaults
            </h3>
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <p className="text-sm font-bold text-white mb-1">Default Difficulty</p>
              <p className="text-[10px] text-gray-400 mb-3">Applied when starting a new quiz</p>
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="glass-card p-4 md:p-6">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2 uppercase tracking-widest">
              <Shield size={16} className="text-primary" /> Account
            </h3>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Email</p>
                  <p className="text-[10px] text-gray-500">{currentUser?.email}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${
                  currentUser?.emailVerified ? 'text-green-400 bg-green-500/10' : 'text-yellow-400 bg-yellow-500/10'
                }`}>
                  {currentUser?.emailVerified ? 'Verified' : 'Unverified'}
                </span>
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
            disabled={loading || !hasChanges}
            className={`w-full py-4 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 ${
              hasChanges
                ? 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'
                : 'bg-white/5 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save size={18} />
            {loading ? 'Saving...' : hasChanges ? 'Save Settings' : 'No Changes'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
