import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium mb-8 border-primary/30"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-gray-300">The Next Generation Learning Platform</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight"
          >
            Master JavaScript with <br className="hidden md:block" />
            <span className="text-gradient">Intelligent Quizzes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Elevate your coding skills with AI-powered personalized learning paths, real-time feedback, and interactive challenges designed by industry experts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2 group">
              Start Learning Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/quiz" className="w-full sm:w-auto glass hover:bg-white/10 text-white px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center justify-center gap-2 group">
              <Play className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              Quick Quiz
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto border-t border-white/10 pt-8"
          >
            <div className="flex flex-col items-center justify-center">
              <Zap className="w-6 h-6 text-yellow-400 mb-2" />
              <span className="text-xs sm:text-sm text-gray-300">Lightning Fast</span>
            </div>
            <div className="flex flex-col items-center justify-center border-x border-white/10">
              <Shield className="w-6 h-6 text-green-400 mb-2" />
              <span className="text-xs sm:text-sm text-gray-300">Enterprise Security</span>
            </div>
            <div className="flex flex-col items-center justify-center col-span-2 sm:col-span-1">
              <Sparkles className="w-6 h-6 text-primary mb-2" />
              <span className="text-xs sm:text-sm text-gray-300">AI Powered</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
