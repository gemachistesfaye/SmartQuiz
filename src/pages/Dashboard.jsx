import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import StatCards from '../components/dashboard/StatCards';
import ProgressChart from '../components/dashboard/ProgressChart';
import WeakTopics from '../components/dashboard/WeakTopics';
import LeaderboardPreview from '../components/dashboard/LeaderboardPreview';
import RecommendationEngine from '../components/dashboard/RecommendationEngine';
import { Sparkles, Brain, Target, Zap, Trophy, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { userData, currentUser } = useAuth();
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "users", currentUser.uid, "quizHistory"),
      orderBy("createdAt", "desc"),
      limit(3)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRecentQuizzes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              Welcome back, {userData?.fullName?.split(' ')[0] || 'Learner'}! <Sparkles className="text-yellow-400" />
            </h1>
            <p className="text-gray-400">Ready to continue your JavaScript mastery journey?</p>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6">
          <div className="lg:col-span-2 space-y-8">
            <RecommendationEngine />
            <StatCards />
            <ProgressChart />

            {/* Continue Learning */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target size={20} className="text-primary" /> Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { to: '/quiz', label: 'Take Quiz', icon: <Zap size={18} />, color: 'text-yellow-400' },
                  { to: '/codelab', label: 'Code Lab', icon: <Brain size={18} />, color: 'text-purple-400' },
                  { to: '/theory', label: 'Read Theory', icon: <Sparkles size={18} />, color: 'text-blue-400' },
                  { to: '/ai-assistant', label: 'Ask AI', icon: <Sparkles size={18} />, color: 'text-green-400' },
                ].map((action) => (
                  <Link
                    key={action.to}
                    to={action.to}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 hover:bg-primary/5 transition-all text-center"
                  >
                    <div className={action.color}>{action.icon}</div>
                    <span className="text-xs font-bold text-gray-300">{action.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WeakTopics />
              <LeaderboardPreview />
            </div>
          </div>

          <div className="space-y-6">
            {/* Recent Quiz Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Trophy size={20} className="text-yellow-400" /> Recent Results
                </h3>
                <Link to="/analytics" className="text-[10px] font-bold text-primary flex items-center gap-1 hover:underline">
                  View All <ArrowRight size={10} />
                </Link>
              </div>
              {recentQuizzes.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No quizzes taken yet</p>
              ) : (
                <div className="space-y-3">
                  {recentQuizzes.map((q) => (
                    <div key={q.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${(q.percentage || 0) >= 80 ? 'bg-green-400' : (q.percentage || 0) >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`} />
                        <span className="text-sm text-gray-300">{q.score}/{q.total}</span>
                      </div>
                      <span className="text-sm font-bold text-primary">{q.percentage || 0}%</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Daily Mission */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6 border-primary/20 bg-primary/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl" />
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Brain size={20} className="text-primary" /> Daily Mission
              </h3>
              <p className="text-sm text-gray-400 mb-4">Complete 3 questions to earn bonus XP.</p>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-4">
                <div className="bg-primary h-full" style={{ width: `${Math.min(100, (recentQuizzes.length / 3) * 100)}%` }} />
              </div>
              <Link to="/quiz" className="block w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20 text-center">
                Start Quiz
              </Link>
            </motion.div>

            {/* Streak */}
            <div className="glass-card p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border-white/5">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap size={20} className="text-secondary" /> Study Streak
              </h3>
              <div className="flex justify-between items-center mb-4">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      i < Math.min(userData?.streak || 0, 7) ? 'bg-secondary text-white' : 'bg-white/5 text-gray-500'
                    }`}>
                      {day}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                You're on a <span className="text-secondary font-bold">{userData?.streak || 0}-day streak!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
