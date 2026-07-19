import { motion } from 'framer-motion';
import { Code2, Brain, Trophy, Terminal, Users, Cpu } from 'lucide-react';

const features = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Real-world Projects",
    description: "Learn by building actual applications, not just reading theory. Our hands-on approach ensures you're job-ready."
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "AI-Powered Hints",
    description: "Get unstuck instantly with our intelligent tutor that guides you without giving away the direct answers."
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Gamified Learning",
    description: "Earn badges, climb the leaderboard, and stay motivated as you master complex JavaScript concepts."
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "In-Browser IDE",
    description: "Write, test, and debug code directly in your browser. No setup or external tools required."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Driven",
    description: "Connect with thousands of other learners. Share solutions, review code, and grow together."
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Performance Metrics",
    description: "Track your progress with detailed analytics on execution time, memory usage, and code quality."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Everything you need to <span className="text-gradient">succeed</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Our platform provides a comprehensive suite of tools designed to accelerate your learning journey and make mastering JavaScript an enjoyable experience.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 md:p-8 group hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
