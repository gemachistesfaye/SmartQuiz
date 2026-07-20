import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUserStats } from '../../hooks/useFirestore';

export default function StatCards() {
  const { userData } = useAuth();
  const { stats } = useUserStats();

  const displayStats = [
    { label: 'Total XP', value: (userData?.xp || 0).toLocaleString(), icon: <Trophy />, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Avg. Quiz Score', value: stats.totalQuizzes > 0 ? `${stats.avgScore}%` : '—', icon: <Target />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Current Streak', value: `${userData?.streak || 0} Days`, icon: <Zap />, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Quizzes Taken', value: stats.totalQuizzes || '0', icon: <Clock />, color: 'text-green-400', bg: 'bg-green-400/10' },
  ];

  return (
    <div className="flex gap-3 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 mb-6 overflow-x-auto pb-2 scrollbar-hide">
      {displayStats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card p-4 md:p-6 border-white/5 min-w-[140px] md:min-w-0 shrink-0"
        >
          <div className="flex items-center justify-between mb-3 md:mb-4">
            <div className={`p-2 md:p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
          <h3 className="text-xl md:text-2xl font-bold text-white">{stat.value}</h3>
        </motion.div>
      ))}
    </div>
  );
}
