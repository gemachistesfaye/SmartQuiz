import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import DashboardLayout from '../layouts/DashboardLayout';
import { User, Mail, Shield, Camera, Zap, Trophy, Save } from 'lucide-react';

export default function Profile() {
  const { userData, currentUser, isAdmin, resetPassword, checkUsernameUnique, refreshUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userData?.fullName || '',
    username: userData?.username || '',
  });
  const [usernameError, setUsernameError] = useState('');

  const validateUsername = async (username) => {
    if (!username || username.length < 3) {
      setUsernameError('Username must be at least 3 characters');
      return false;
    }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
      setUsernameError('3-20 chars, letters/numbers/underscores only');
      return false;
    }
    if (username === userData?.username) {
      setUsernameError('');
      return true;
    }
    const isUnique = await checkUsernameUnique(username, currentUser.uid);
    if (!isUnique) {
      setUsernameError('Username is already taken');
      return false;
    }
    setUsernameError('');
    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate username if changed
    if (formData.username !== userData?.username) {
      const isValid = await validateUsername(formData.username);
      if (!isValid) return;
    }

    if (!formData.fullName.trim()) {
      toast.error('Full name is required');
      return;
    }

    try {
      setLoading(true);
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        fullName: formData.fullName.trim(),
        username: formData.username.trim().toLowerCase(),
      });
      await refreshUserData();
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="px-4 md:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">

          {/* Left Column: Avatar & Stats */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass-card p-5 md:p-8 text-center ${isAdmin ? 'border-red-500/10' : ''}`}
            >
              <div className="relative inline-block mb-4 md:mb-6">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.fullName || 'User')}&size=128&background=random`}
                  alt="Profile"
                  className="w-20 h-20 md:w-32 md:h-32 rounded-2xl md:rounded-3xl border-4 border-white/5"
                />
                <button type="button" className={`absolute -bottom-2 -right-2 p-2.5 rounded-xl shadow-lg transition-all ${isAdmin ? 'bg-red-500' : 'bg-primary'}`}>
                  <Camera size={20} className="text-white" />
                </button>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{userData?.fullName}</h2>
              <p className="text-gray-400 mb-4 md:mb-6 font-medium text-sm">@{userData?.username}</p>
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                isAdmin ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'
              }`}>
                {userData?.role || 'Learner'}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-4 md:p-6 grid grid-cols-2 gap-3 md:gap-4"
            >
              <div className="text-center p-4 rounded-2xl bg-white/5">
                <Trophy className="text-yellow-400 mx-auto mb-2" size={24} />
                <p className="text-xs text-gray-500 uppercase font-bold">XP</p>
                <p className="text-xl font-bold text-white">{userData?.xp || 0}</p>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/5">
                <Zap className="text-orange-400 mx-auto mb-2" size={24} />
                <p className="text-xs text-gray-500 uppercase font-bold">Streak</p>
                <p className="text-xl font-bold text-white">{userData?.streak || 0}d</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Edit Profile */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-5 md:p-8"
            >
              <div className="flex items-center gap-3 mb-5 md:mb-8">
                <User className={isAdmin ? 'text-red-500' : 'text-primary'} size={24} />
                <h3 className="text-xl font-bold text-white">Account Settings</h3>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-400 uppercase ml-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      className={`w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white focus:outline-none transition-colors ${
                        isAdmin ? 'focus:border-red-500/50' : 'focus:border-primary/50'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-400 uppercase ml-1">Username</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => {
                        setFormData({...formData, username: e.target.value});
                        setUsernameError('');
                      }}
                      onBlur={() => validateUsername(formData.username)}
                      className={`w-full bg-white/5 border rounded-xl py-3.5 px-4 text-white focus:outline-none transition-colors ${
                        usernameError ? 'border-red-500/50' : 'border-white/10'
                      } ${isAdmin ? 'focus:border-red-500/50' : 'focus:border-primary/50'}`}
                    />
                    {usernameError && (
                      <p className="text-[11px] text-red-400 ml-1">{usernameError}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-400 uppercase ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input
                      type="email"
                      disabled
                      value={currentUser?.email}
                      className="w-full bg-white/5 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    disabled={loading}
                    className={`text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 disabled:opacity-50 ${
                      isAdmin ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' : 'bg-primary hover:bg-primary/90 shadow-primary/20'
                    }`}
                  >
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={20} /> Save Changes</>}
                  </button>
                </div>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-5 md:p-8"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <Shield className={isAdmin ? 'text-red-400' : 'text-gray-400'} size={24} />
                <h3 className="text-xl font-bold text-white">Security</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4 md:mb-6">Manage your account security settings.</p>

              <div className="space-y-4">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await resetPassword(currentUser.email);
                      toast.success('Password reset email sent! Check your inbox.');
                    } catch {
                      toast.error('Failed to send reset email. Try again later.');
                    }
                  }}
                  className="bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                >
                  Reset Password
                </button>
                {isAdmin && (
                  <div className="bg-red-500/10 text-red-500 px-4 py-2 rounded-xl text-sm font-bold inline-flex items-center gap-2">
                    <Shield size={16} /> Admin Mode Active
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
