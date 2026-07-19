import { motion } from 'framer-motion';
import { Code2, Brain, Trophy, Terminal, Users, Cpu } from 'lucide-react';

const features = [
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "Multi-Language Support",
    description: "Practice JavaScript, Python, HTML/CSS, React, TypeScript, and cybersecurity concepts — all in one platform."
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: "AI-Powered Tutor",
    description: "Get unstuck with intelligent hints that guide you toward the answer without spoiling the learning."
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    title: "Gamified Progress",
    description: "Earn XP, maintain streaks, climb the leaderboard, and unlock achievements as you learn."
  },
  {
    icon: <Terminal className="w-5 h-5" />,
    title: "Interactive Code Lab",
    description: "Write and run code directly in your browser with our built-in IDE — no setup required."
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Built for Ethiopia",
    description: "Designed with Ethiopian learners in mind — relevant content, local community, and accessible on mobile."
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Performance Tracking",
    description: "Detailed analytics show your strengths, weaknesses, and progress across every topic and category."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Everything you need to <span className="text-primary">level up</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-sm md:text-base"
          >
            A complete learning platform with tools designed to make mastering programming fast, fun, and effective.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="bg-[#111] border border-white/5 rounded-2xl p-5 md:p-6 hover:border-primary/20 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
