import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../services/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

export default function StatCards() {
  const { userData, currentUser } = useAuth();
  const [stats, setStats] = useState({
    avgScore: 0,
    totalTime: 0,
    quizzesTaken: 0,
  });

  useEffect(() => {
    if (!currentUser) return;
    const q = query(
      collection(db, "users", currentUser.uid, "quizHistory"),
      orderBy("createdAt", "desc"),
      limit(50)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map(d => d.data());
      if (history.length === 0) {
        setStats({ avgScore: 0, totalTime: 0, quizzesTaken: 0 });
        return;
      }
      const avgScore = Math.round(history.reduce((sum, h) => sum + (h.percentage || 0), 0) / history.length);
      setStats({
        avgScore,
        totalTime: history.length,
        quizzesTaken: history.length,
      });
    });
    return () => unsubscribe();
  }, [currentUser]);

  const displayStats = [
    { label: 'Total XP', value: (userData?.xp || 0).toLocaleString(), icon: <Trophy />, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Avg. Quiz Score', value: stats.quizzesTaken > 0 ? `${stats.avgScore}%` : '—', icon: <Target />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Current Streak', value: `${userData?.streak || 0} Days`, icon: <Zap />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Quizzes Taken', value: stats.quizzesTaken || '0', icon: <Clock />, color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {displayStats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-6 border-white/5"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
          <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
        </motion.div>
      ))}
    </div>
  );
}
