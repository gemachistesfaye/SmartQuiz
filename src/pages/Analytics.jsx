import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useUserStats } from '../hooks/useFirestore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, TrendingUp, Award, Zap, Clock, Brain } from 'lucide-react';

export default function Analytics() {
  const { userData } = useAuth();
  const { stats, loading } = useUserStats();

  const chartData = stats.chartData;
  const categoryBreakdown = stats.categoryBreakdown;
  const recentQuizzes = stats.recentQuizzes;

  return (
    <DashboardLayout>
      <div className="px-4 md:px-6 pb-24 space-y-4 md:space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
          <div>
            <h1 className="text-xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Target className="text-primary" size={28} /> Analytics
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Your learning journey at a glance.</p>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {[
            { label: 'Total XP', value: (userData?.xp || 0).toLocaleString(), icon: <Zap className="text-yellow-400" />, bg: 'bg-yellow-400/10' },
            { label: 'Avg. Score', value: stats.totalQuizzes > 0 ? `${stats.avgScore}%` : '—', icon: <Target className="text-blue-400" />, bg: 'bg-blue-400/10' },
            { label: 'Quizzes Taken', value: stats.totalQuizzes, icon: <Award className="text-purple-400" />, bg: 'bg-purple-400/10' },
            { label: 'Best Streak', value: `${userData?.streak || 0} days`, icon: <TrendingUp className="text-green-400" />, bg: 'bg-green-400/10' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-3 md:p-5"
            >
              <div className={`p-2 rounded-lg inline-block mb-2 md:mb-3 ${stat.bg}`}>{stat.icon}</div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Score history chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 md:p-8"
        >
          <h3 className="text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" /> Score History
          </h3>
          {loading ? (
            <div className="flex justify-center py-8 md:py-12">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : chartData.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No quiz history yet. Take a quiz to see your progress!</p>
          ) : (
            <div className="h-[200px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorScore2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 11 }} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px', color: '#fff' }}
                    formatter={(v) => [`${v}%`, 'Score']}
                  />
                  <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore2)" dot={{ r: 4, fill: '#3b82f6', stroke: '#0a0a0a', strokeWidth: 2 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        {/* Category breakdown */}
        {Object.keys(categoryBreakdown).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 md:p-8"
          >
            <h3 className="text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <Brain size={20} className="text-primary" /> Category Breakdown
            </h3>
            <div className="space-y-3 md:space-y-4">
              {Object.entries(categoryBreakdown).map(([cat, data]) => {
                const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                return (
                  <div key={cat}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-300 font-medium">{cat}</span>
                      <span className="text-gray-500">{pct}% accuracy ({data.correct}/{data.total})</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-1000 ${pct >= 80 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Recent quiz history */}
        {recentQuizzes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 md:p-8"
          >
            <h3 className="text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
              <Clock size={20} className="text-primary" /> Recent Quizzes
            </h3>
            <div className="space-y-2 md:space-y-3">
              {recentQuizzes.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${(h.percentage || 0) >= 80 ? 'bg-green-400' : (h.percentage || 0) >= 50 ? 'bg-yellow-400' : 'bg-red-400'}`} />
                    <span className="text-sm text-gray-300">{h.score}/{h.total} correct</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-primary">{h.percentage || 0}%</span>
                    <span className="text-[10px] text-gray-500">{new Date(h.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
