import { motion } from 'framer-motion';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCards from '../components/dashboard/StatCards';
import ProgressChart from '../components/dashboard/ProgressChart';
import RecentActivity from '../components/dashboard/RecentActivity';
import WeakTopics from '../components/dashboard/WeakTopics';
import LeaderboardPreview from '../components/dashboard/LeaderboardPreview';
import RecommendationEngine from '../components/dashboard/RecommendationEngine';
import BadgeSystem from '../components/dashboard/BadgeSystem';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Brain, Trophy, Target } from 'lucide-react';

export default function Dashboard() {
  const { userData } = useAuth();

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
            <p className="text-gray-400">You've completed 85% of your weekly goal. Keep it up!</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Trophy size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Global Rank</p>
                <p className="text-xl font-bold text-white">#{userData?.rank || '124'}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6">
          <div className="lg:col-span-2 space-y-8">
            <RecommendationEngine />
            <StatCards />
            <ProgressChart />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <WeakTopics />
              <LeaderboardPreview />
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Daily Mission Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6 border-primary/20 bg-primary/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl" />
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Brain size={20} className="text-primary" /> Daily Mission
              </h3>
              <p className="text-sm text-gray-400 mb-4">Complete 3 "Hard" difficulty questions to earn 500 bonus XP.</p>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-4">
                <div className="bg-primary w-2/3 h-full" />
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-primary/20">
                Continue Mission
              </button>
            </motion.div>
            
            {/* Streak Card */}
            <div className="glass-card p-6 bg-gradient-to-br from-secondary/10 to-primary/10 border-white/5">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target size={20} className="text-secondary" /> Study Streak
              </h3>
              <div className="flex justify-between items-center mb-6">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      i < 4 ? 'bg-secondary text-white' : 'bg-white/5 text-gray-500'
                    }`}>
                      {day}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                You're on a <span className="text-secondary font-bold">4-day streak!</span>
              </p>
            </div>

            <RecentActivity />
          </div>
        </div>

        {/* Global Gamification */}
        <div className="px-6">
          <BadgeSystem />
        </div>
      </div>
    </DashboardLayout>
  );
}
