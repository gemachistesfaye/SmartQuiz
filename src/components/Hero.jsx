import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Refined glowing orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium mb-8 backdrop-blur-md shadow-lg shadow-black/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="text-gray-300 tracking-wide uppercase">Multi-Language Learning Platform</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-sm"
          >
            Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-400">Any Language</span>
            <br className="hidden sm:block" />
            {' '}with Smart Quizzes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            From JavaScript to Python, HTML/CSS to cybersecurity — learn programming with AI-powered quizzes, interactive code labs, and personalized learning paths designed for modern developers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 relative"
          >
            {/* Glassmorphic backdrop for buttons */}
            <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full" />
            
            <Link to="/register" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] flex items-center justify-center gap-2 group relative z-10">
              Start Learning Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/quiz" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-all border border-white/10 flex items-center justify-center gap-2 relative z-10 backdrop-blur-md">
              <Play className="w-4 h-4" />
              Try a Quiz
            </Link>
          </motion.div>

          {/* Language tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-2"
          >
            {['JavaScript', 'Python', 'HTML/CSS', 'React', 'Cybersecurity', 'TypeScript'].map((lang) => (
              <span key={lang} className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] font-medium text-gray-400 hover:text-gray-200 hover:border-white/10 transition-colors cursor-default backdrop-blur-sm">
                {lang}
              </span>
            ))}
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid grid-cols-3 gap-4 md:gap-8 max-w-xl mx-auto border-t border-white/5 pt-8"
          >
            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Zap className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-[11px] md:text-xs font-medium text-gray-300">Instant Feedback</span>
            </div>
            <div className="flex flex-col items-center border-x border-white/5 group">
              <div className="w-10 h-10 rounded-full bg-green-400/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Shield className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-[11px] md:text-xs font-medium text-gray-300">Free to Use</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[11px] md:text-xs font-medium text-gray-300">AI Powered</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
