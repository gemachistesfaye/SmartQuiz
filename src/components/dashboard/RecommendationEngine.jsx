import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Target, Brain } from 'lucide-react';

export default function RecommendationEngine() {
  const recommendations = [
    {
      topic: 'Async JavaScript',
      reason: 'Your last 3 attempts were < 60%',
      action: 'Start Theory Lesson',
      icon: <Zap className="text-yellow-400" />,
      color: 'from-yellow-400/20 to-orange-400/20'
    },
    {
      topic: 'Event Loop',
      reason: 'Based on your interest in Performance',
      action: 'Watch Video',
      icon: <Brain className="text-blue-400" />,
      color: 'from-blue-400/20 to-indigo-400/20'
    },
    {
      topic: 'XSS Prevention',
      reason: 'New track added to Cybersecurity',
      action: 'Try Challenge',
      icon: <Target className="text-red-400" />,
      color: 'from-red-400/20 to-pink-400/20'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles size={18} className="text-primary" /> AI Smart Picks
        </h3>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Personalized</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((rec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-[2rem] bg-gradient-to-br ${rec.color} border border-white/5 group cursor-pointer relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
              {rec.icon}
            </div>
            
            <div className="bg-white/10 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-white">
              {rec.icon}
            </div>
            
            <h4 className="font-bold text-white mb-1">{rec.topic}</h4>
            <p className="text-[10px] text-gray-400 mb-4">{rec.reason}</p>
            
            <button className="flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-widest group-hover:gap-3 transition-all">
              {rec.action} <ArrowRight size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
