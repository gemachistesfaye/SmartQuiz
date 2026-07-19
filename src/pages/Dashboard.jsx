import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import StatCards from '../components/dashboard/StatCards';
import ProgressChart from '../components/dashboard/ProgressChart';
import { Brain, Target, Zap, Trophy, BookOpen, Code } from 'lucide-react';

export default function Dashboard() {
  const { userData, currentUser } = useAuth();
  const [recentQuizzes, setRecentQuizzes] = useState([]);

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "users", currentUser.uid, "quizHistory"),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRecentQuizzes(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <DashboardLayout>
      <div className="space-y-4 pb-4">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-lg md:text-2xl font-bold text-white">
            Welcome back, {userData?.fullName?.split(' ')[0] || 'Learner'} 👋
          </h1>
          <p className="text-gray-400 text-xs md:text-sm mt-1">Pick up where you left off</p>
        </motion.div>

        {/* Stats */}
        <StatCards />

        {/* Quick Start */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="grid grid-cols-4 gap-2 md:gap-3">
            {[
              { to: '/quiz', label: 'Quiz', icon: <Zap size={18} />, color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
              { to: '/codelab', label: 'Code Lab', icon: <Code size={18} />, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
              { to: '/theory', label: 'Theory', icon: <BookOpen size={18} />, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
              { to: '/ai-assistant', label: 'AI Tutor', icon: <Brain size={18} />, color: 'bg-green-500/10 text-green-400 border-green-500/20' },
            ].map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl md:rounded-2xl border hover:scale-[1.02] transition-all ${action.color}`}
              >
                {action.icon}
                <span className="text-[10px] md:text-xs font-bold">{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left - Chart */}
          <div className="lg:col-span-2">
            <ProgressChart />
          </div>

          {/* Right - Recent Results */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="bg-[#111] border border-white/5 rounded-2xl p-4 md:p-5 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Trophy size={16} className="text-yellow-400" /> Recent Results
                </h3>
                <Link to="/analytics" className="text-[10px] font-bold text-primary hover:underline">
                  View All
                </Link>
              </div>
              {recentQuizzes.length === 0 ? (
                <div className="text-center py-8">
                  <Target size={28} className="text-gray-700 mx-auto mb-2" />
                  <p className="text-gray-500 text-xs">No quizzes yet</p>
                  <Link to="/quiz" className="text-primary text-xs font-bold hover:underline mt-1 inline-block">Take your first quiz</Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentQuizzes.map((q) => (
                    <div key={q.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                          (q.percentage || 0) >= 80 ? 'bg-green-500/10 text-green-400' :
                          (q.percentage || 0) >= 50 ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-red-500/10 text-red-400'
                        }`}>
                          {q.percentage || 0}%
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white">{q.category || 'Quiz'}</p>
                          <p className="text-[10px] text-gray-500">{q.score}/{q.total} correct</p>
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-600">
                        {q.createdAt ? new Date(q.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric' }) : ''}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Streak + Daily Mission row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          {/* Streak */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="bg-[#111] border border-white/5 rounded-2xl p-4 md:p-5">
              <h3 className="text-xs md:text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Zap size={14} className="text-yellow-400" /> Study Streak
              </h3>
              <div className="flex justify-between mb-3">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className={`w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold transition-all ${
                    i < Math.min(userData?.streak || 0, 7)
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'bg-white/5 text-gray-600'
                  }`}>
                    {day}
                  </div>
                ))}
              </div>
              <p className="text-[11px] md:text-xs text-gray-400">
                {userData?.streak > 0 ? (
                  <>🔥 <span className="text-white font-bold">{userData.streak}-day streak!</span> Keep going!</>
                ) : (
                  'Start a quiz to begin your streak'
                )}
              </p>
            </div>
          </motion.div>

          {/* Daily Mission */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 rounded-2xl p-4 md:p-5">
              <h3 className="text-xs md:text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Target size={14} className="text-primary" /> Daily Challenge
              </h3>
              <p className="text-[11px] md:text-xs text-gray-400 mb-3">Complete 3 quizzes today for bonus XP</p>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-3">
                <div className="bg-primary h-full rounded-full transition-all" style={{ width: `${Math.min(100, (recentQuizzes.length / 3) * 100)}%` }} />
              </div>
              <Link to="/quiz" className="block w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-xl text-[11px] md:text-xs font-bold transition-all text-center">
                {recentQuizzes.length >= 3 ? 'Completed!' : 'Start Quiz'}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
