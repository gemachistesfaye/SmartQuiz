import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-44 md:pb-28 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-gray-300">Multi-Language Learning Platform</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Master <span className="text-primary">Any Language</span>
            <br />
            with Smart Quizzes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            From JavaScript to Python, HTML/CSS to cybersecurity — learn programming with AI-powered quizzes, interactive code labs, and personalized learning paths.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Link to="/register" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-full text-sm font-bold transition-all shadow-[0_0_25px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2 group">
              Start Learning Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/quiz" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-7 py-3.5 rounded-full text-sm font-bold transition-all border border-white/10 flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Try a Quiz
            </Link>
          </motion.div>

          {/* Language tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            {['JavaScript', 'Python', 'HTML/CSS', 'React', 'Cybersecurity', 'TypeScript'].map((lang) => (
              <span key={lang} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[11px] font-medium text-gray-400">
                {lang}
              </span>
            ))}
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-lg mx-auto border-t border-white/10 pt-8"
          >
            <div className="flex flex-col items-center">
              <Zap className="w-5 h-5 text-yellow-400 mb-1.5" />
              <span className="text-[11px] md:text-xs text-gray-300">Instant Feedback</span>
            </div>
            <div className="flex flex-col items-center border-x border-white/10">
              <Shield className="w-5 h-5 text-green-400 mb-1.5" />
              <span className="text-[11px] md:text-xs text-gray-300">Free to Use</span>
            </div>
            <div className="flex flex-col items-center">
              <Sparkles className="w-5 h-5 text-primary mb-1.5" />
              <span className="text-[11px] md:text-xs text-gray-300">AI Powered</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
