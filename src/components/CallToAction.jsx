import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card p-8 md:p-10 rounded-3xl border border-primary/20 bg-background/50 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full" />
          
          <div className="flex justify-center mb-4">
            <div className="bg-primary/20 p-2.5 rounded-xl">
              <Sparkles className="text-primary" size={22} />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            Ready to Level Up Your Skills?
          </h2>
          <p className="text-base text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join developers mastering programming through interactive quizzes, AI assistance, and theory guides.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/register" 
              className="bg-primary hover:bg-primary/90 text-white px-7 py-3.5 rounded-xl font-semibold text-base transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              Start Learning for Free <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
