import { motion } from 'framer-motion';

const stats = [
  { value: '6+', label: 'Languages' },
  { value: '500+', label: 'Quizzes' },
  { value: '10K+', label: 'Learners' },
  { value: '4.9/5', label: 'Rating' },
];

export default function Stats() {
  return (
    <section className="py-8 border-y border-white/5 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-[10px] md:text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
