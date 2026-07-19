import { motion } from 'framer-motion';
import { UserPlus, BrainCircuit, Trophy } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create an Account",
      description: "Sign up in seconds and get instant access to our comprehensive programming theory vault and quizzes."
    },
    {
      icon: BrainCircuit,
      title: "Learn & Practice",
      description: "Read through structured concepts and test your knowledge with our adaptive quiz engine."
    },
    {
      icon: Trophy,
      title: "Track Progress",
      description: "Climb the leaderboard, analyze your weaknesses, and become a programming master."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
          >
            How it Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Your path to mastering coding is simple and structured.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                <div className="w-24 h-24 mx-auto bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6 relative z-10 backdrop-blur-sm group-hover:bg-primary/20 transition-colors">
                  <Icon className="text-primary" size={40} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
