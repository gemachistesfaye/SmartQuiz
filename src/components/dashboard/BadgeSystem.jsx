import React from 'react';
import { motion } from 'framer-motion';
import { Medal, Star, Flame, Trophy, Award, Zap, Shield, Target } from 'lucide-react';

const badges = [
  { id: 1, name: 'First Flight', icon: <Medal />, color: 'text-blue-400', unlocked: true, desc: 'Complete your first quiz' },
  { id: 2, name: 'Quick Learner', icon: <Zap />, color: 'text-yellow-400', unlocked: true, desc: 'Finish a quiz in under 2 mins' },
  { id: 3, name: 'Fire Streak', icon: <Flame />, color: 'text-orange-400', unlocked: true, desc: 'Maintain a 3-day streak' },
  { id: 4, name: 'Secure Coder', icon: <Shield />, color: 'text-green-400', unlocked: false, desc: 'Complete Cybersecurity Track' },
  { id: 5, name: 'Top Tier', icon: <Trophy />, color: 'text-purple-400', unlocked: false, desc: 'Reach the Top 10 Leaderboard' },
  { id: 6, name: 'JS Master', icon: <Award />, color: 'text-red-400', unlocked: false, desc: 'Solve 10 Hard questions' },
];

export default function BadgeSystem() {
  return (
    <div className="glass-card p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <Star className="text-yellow-400 fill-yellow-400/20" size={24} /> Achievements & Badges
        </h3>
        <span className="text-xs font-bold text-gray-500">{badges.filter(b => b.unlocked).length}/{badges.length} Unlocked</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {badges.map((badge) => (
          <motion.div
            key={badge.id}
            whileHover={{ y: -5 }}
            className="flex flex-col items-center text-center group"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-3 transition-all relative ${
              badge.unlocked 
                ? `bg-white/5 border border-white/10 ${badge.color}` 
                : 'bg-white/[0.02] border border-white/5 text-gray-700 grayscale'
            }`}>
              {React.cloneElement(badge.icon, { size: 28 })}
              {!badge.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 rounded-2xl">
                  <Target size={16} className="text-gray-500" />
                </div>
              )}
            </div>
            <p className={`text-[10px] font-bold uppercase tracking-widest ${badge.unlocked ? 'text-white' : 'text-gray-600'}`}>
              {badge.name}
            </p>
            <p className="text-[8px] text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {badge.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
